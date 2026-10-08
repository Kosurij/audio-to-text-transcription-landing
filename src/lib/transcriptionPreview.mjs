export const previewFileDefaults = {maxFileBytes:100*1024*1024,supportedExtensions:['flac','mp3','m4a','mpeg','mpga','ogg','opus','wav','aac','wma','webm','mov','mp4','m4v']};
const apiBase = (import.meta.env?.PUBLIC_PREVIEW_API_URL || 'https://api.audio-to-text-transcription.com').replace(/\/$/, '');
export function validatePreviewFile(file, config) {
  if (!file || !file.size) return 'Choose a non-empty audio or video file.';
  if (file.size > config.maxFileBytes) return `This file is too large. The preview limit is ${Math.round(config.maxFileBytes / 1024 / 1024)} MB.`;
  if (!config.supportedExtensions.includes(file.name.split('.').pop().toLowerCase())) return 'This file format is not supported. Choose an audio or video file.';
  return '';
}
async function getConfig(signal) {
  const response = await fetch(`${apiBase}/web/preview-config`, {signal: AbortSignal.any([signal, AbortSignal.timeout(10000)])});
  if (!response.ok) throw new Error('The online preview is temporarily unavailable. Please try again later.');
  const data = await response.json();
  if (typeof data.enabled !== 'boolean' || !(data.maxFileBytes > 0) || !(data.dailySeconds > 0) || !Array.isArray(data.supportedExtensions)) throw new Error('The online preview is temporarily unavailable.');
  return data;
}
export function uploadPreview(file, signal, onProgress, onUploaded) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const abort = () => xhr.abort();
    const cleanup = () => signal.removeEventListener('abort', abort);
    if (signal.aborted) { reject(new Error('Upload cancelled.')); return; }
    signal.addEventListener('abort', abort, {once: true});
    xhr.open('POST', `${apiBase}/web/transcribe-preview`);
    xhr.timeout = 365000;
    xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100)); };
    xhr.upload.onload = onUploaded;
    xhr.onload = () => {
      cleanup();
      let data;
      try { data = JSON.parse(xhr.responseText); } catch { reject(new Error('The preview service returned an unexpected response. Please try again.')); return; }
      if (xhr.status < 200 || xhr.status >= 300) {
        let message = data.message || 'The preview could not be completed. Please try again.';
        if (data.retryAfterSeconds) message += ` Try again after ${new Date(Date.now() + data.retryAfterSeconds * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}.`;
        reject(new Error(message)); return;
      }
      if (typeof data.text !== 'string' || typeof data.hasMoreAudio !== 'boolean' || !(data.processedSeconds > 0 && data.processedSeconds <= 3600)) {
        reject(new Error('The preview service returned an unexpected response.')); return;
      }
      resolve(data);
    };
    xhr.onerror = () => { cleanup(); reject(new Error('Could not connect. Check your connection and try again.')); };
    xhr.ontimeout = () => { cleanup(); reject(new Error('The preview timed out. Please try again.')); };
    xhr.onabort = () => { cleanup(); reject(new Error('Upload cancelled.')); };
    const body = new FormData(); body.append('audio', file); xhr.send(body);
  });
}
export function initialPreviewState() {
  return {config:null, file:null, status:'loading', error:'', progress:0, result:null};
}
export function createPreviewController(options = {}) {
  const state = options.state || initialPreviewState();
  const configRequest = options.getConfig || getConfig;
  const transcribe = options.transcribe || uploadPreview;
  let current = null; let configController = null; let disposed = false;
  const busy = () => ['uploading','processing'].includes(state.status);
  return {
    state,
    async init() {
      if (disposed) return;
      configController?.abort();
      configController = new AbortController();
      try { const config = await configRequest(configController.signal); if (disposed) return;
        state.config = config; if (state.status === 'loading') state.status = config.enabled ? 'idle' : 'disabled';
      } catch (e) { if (!disposed && state.status === 'loading') { state.status = 'disabled'; } }
    },
    select(file) {
      if (disposed || busy()) return;
      state.error = file ? validatePreviewFile(file, state.config || previewFileDefaults) : '';
      state.file = state.error ? null : file;
      state.result = null;
      state.progress = 0;
      state.status = 'idle';
    },
    async submit() {
      if (disposed || busy() || !state.file) return;
      state.error = validatePreviewFile(state.file, state.config || previewFileDefaults);
      if (state.error) return;
      current = new AbortController(); state.status = 'uploading'; state.progress = 0;
      try {
        const result = await transcribe(state.file, current.signal,
          value => { if (!disposed) state.progress = value; },
          () => { if (!disposed) state.status = 'processing'; });
        if (!disposed) { state.result = result; state.status = 'success'; }
      } catch (e) { if (!disposed) { state.error = e.message; state.status = 'error'; } }
    },
    dispose() { disposed = true; current?.abort(); configController?.abort(); },
  };
}
