<template>
  <section id="try-transcription" class="preview-section" aria-labelledby="preview-title">
    <div class="preview-container">
      <div class="section-heading">
        <span class="eyebrow">TRY BEFORE YOU INSTALL</span>
        <h2 id="preview-title">Turn your audio into text</h2>
        <p>See how your recording turns into text with a free demo.<br class="mobile-break" /> No account or installation needed.</p>
      </div>

      <div ref="panel" class="preview-panel ym-hide-content">
        <div ref="panelContent" class="preview-content">
        <noscript><p>Enable JavaScript to select a file and use the demo.</p></noscript>
        <form @submit.prevent="submit" :aria-busy="busy">
          <input ref="fileInput" class="sr-only" tabindex="-1" type="file" :accept="accept" aria-label="Select an audio or video file" @change="choose" />
          <div ref="dropArea" class="file-area" :role="state.file ? undefined : 'button'" :tabindex="state.file ? undefined : 0" :aria-label="state.file ? undefined : 'Select an audio or video file'" @click="openFileDialog" @keydown.enter.self.prevent="openFileDialog" @keydown.space.self.prevent="openFileDialog" :class="{'is-dragging': dragging, 'has-file': state.file}" @dragover.prevent="dragging = canChoose" @dragleave.prevent="dragging = false" @drop.prevent="drop">
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m-4 4 4-4 4 4M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></svg>
            <div v-if="state.file" class="selected-file">
              <div class="file-info">
                <p class="file-name">{{ state.file.name }}</p>
                <p class="file-size">{{ formatSize(state.file.size) }} · <span role="status">{{ durationLabel }}</span></p>
              </div>
              <button class="remove-file" type="button" :disabled="busy" aria-label="Remove file" @click.stop="remove">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M6 18 18 6" /></svg>
              </button>
            </div>
            <template v-else><p class="drop-heading">Select or drop an audio or video file</p><p class="drop-sub">Drag &amp; drop here or click to upload</p></template>
            <div class="file-actions" :class="{'is-empty': !state.file}">
              <Transition name="file-action" mode="out-in" @after-leave="focusFileChoice">
                <div v-if="busy" key="progress" class="upload-progress">
                  <span class="progress-label" role="status" aria-live="polite">{{ state.status === 'uploading' ? `Uploading your file… ${state.progress}%` : 'Transcribing your recording…' }}</span>
                  <div class="progress-track" :class="{'is-processing': state.status === 'processing'}" role="progressbar" :aria-label="state.status === 'uploading' ? 'File upload progress' : 'Transcription in progress'" :aria-valuenow="state.status === 'uploading' ? state.progress : undefined" aria-valuemin="0" aria-valuemax="100">
                    <span class="progress-fill" :style="state.status === 'uploading' ? {width: `${state.progress}%`} : undefined"></span>
                  </div>
                  <span class="progress-hint">Keep this page open. Your text will appear below.</span>
                </div>
                <button v-else-if="state.file && state.file !== transcribedFile" key="transcribe" class="primary-link transcribe-button" type="submit">Transcribe</button>

              </Transition>
            </div>

            <div v-if="!state.file" class="formats"><p class="formats-label">Supported formats</p><div class="format-list"><span v-for="format in (state.config?.supportedExtensions || previewFileDefaults.supportedExtensions)" :key="format">{{ format.toUpperCase() }}</span></div></div>
          <p v-if="!state.file" id="preview-limits" class="size-badge">Up to {{ maxSize }} MB</p>
          </div>
          <p v-if="state.error" class="error-message" role="alert">{{ state.error }}</p>
        </form>

        <div v-if="state.result" class="result" role="region" aria-label="Transcript">
          <div class="result-heading">
            <div class="result-actions"><button type="button" @click="copy"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>{{ actionStatus ? 'Copied!' : 'Copy text' }}</button><button type="button" @click="download"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/></svg>Download TXT</button></div>
          </div>
          <p class="transcript-text">{{ state.result.text }}</p>
          <Teleport to="body"><div class="copy-notification" :class="{'is-visible': actionStatus}" role="status" aria-live="polite" aria-atomic="true"><span v-if="actionStatus"><span aria-hidden="true">✓</span> {{ actionStatus }}</span></div></Teleport>
          <p v-if="copyError" class="small-note" role="alert">Select the transcript above to copy it. Your browser could not access the clipboard.</p>
          <div class="complete-note">
            <div class="extension-copy"><p class="extension-title">Transcribe audio and video in Chrome</p><p>Transcribe your files in the background with the Chrome extension. Keep working and get an email when your transcript is ready.</p></div>
            <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="extension-cta" @click="track('preview_extension_click')"><span class="cta-label">Add to Chrome</span></a>
          </div>
        </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import {computed,onMounted,onBeforeUnmount,reactive,ref,watch} from 'vue'
import {createPreviewController,initialPreviewState,previewFileDefaults} from '../lib/transcriptionPreview.mjs'
const state=reactive(initialPreviewState())
const controller=createPreviewController({state})
const dropArea=ref(null)
const fileInput=ref(null), dragging=ref(false), actionStatus=ref(''),copyError=ref(false)
const panel=ref(null), panelContent=ref(null), duration=ref(null), readingDuration=ref(false)
const transcribedFile=ref(null)
let notificationTimer
let panelObserver
const durationLabel=computed(()=>{
  if(readingDuration.value) return 'Reading duration…'
  if(duration.value===null) return 'Duration unavailable'
  const seconds=Math.round(duration.value)
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} min`
})
watch(()=>state.file,(file,previous,onCleanup)=>{
  transcribedFile.value=null
  clearTimeout(notificationTimer);actionStatus.value='';copyError.value=false
  duration.value=null
  readingDuration.value=!!file
  if(!file) return
  const url=URL.createObjectURL(file)
  const media=document.createElement('video')
  media.preload='metadata'
  let finished=false
  const finish=(value)=>{
    if(finished)return
    finished=true
    clearTimeout(timer)
    media.onloadedmetadata=null;media.onerror=null
    media.removeAttribute('src');media.load();URL.revokeObjectURL(url)
    duration.value=value;readingDuration.value=false
  }
  const timer=setTimeout(()=>finish(null),10000)
  media.onloadedmetadata=()=>finish(Number.isFinite(media.duration)&&media.duration>0?media.duration:null)
  media.onerror=()=>finish(null)
  onCleanup(()=>finish(null))
  media.src=url
})
const busy=computed(()=>['uploading','processing'].includes(state.status))
const canChoose=computed(()=>!busy.value)
const maxSize=computed(()=>Math.round((state.config?.maxFileBytes||previewFileDefaults.maxFileBytes)/1024/1024))
const accept=computed(()=>(state.config?.supportedExtensions||previewFileDefaults.supportedExtensions).map(value=>`.${value}`).join(','))
const storeUrl='https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en&utm_source=site&utm_medium=referral&utm_content=web_preview'
function track(event) { try { if(typeof window.ym==='function') window.ym(105283733,'reachGoal',event) } catch { /* Analytics must never interrupt transcription. */ } }
function select(file) { controller.select(file); if(state.file) track('preview_file_selected') }
function choose(event) { const file=event.target.files?.[0];if(file)select(file);event.target.value='' }
function drop(event) { dragging.value=false; if(canChoose.value) { if(event.dataTransfer.files.length!==1) {state.error='Choose one file at a time.';return} select(event.dataTransfer.files[0]) } }
function openFileDialog() { if(canChoose.value && !state.file) fileInput.value?.click() }
function remove() { controller.select(null) }
function focusFileChoice() { if(!state.file)dropArea.value?.focus() }
async function submit() { if(busy.value||!state.file)return; track('preview_started');await controller.submit();if(state.status==='success')transcribedFile.value=state.file;track(state.status==='success'?'preview_succeeded':'preview_failed') }
function formatSize(bytes) {return bytes<1024*1024?`${Math.ceil(bytes/1024)} KB`:`${(bytes/1024/1024).toFixed(1)} MB`}
async function copy() {const copiedResult=state.result;if(!copiedResult)return;copyError.value=false;actionStatus.value='';try {await navigator.clipboard.writeText(copiedResult.text);if(state.result!==copiedResult)return;clearTimeout(notificationTimer);actionStatus.value='Transcript copied to clipboard';notificationTimer=setTimeout(()=>{actionStatus.value=''},3000);track('preview_copy')}catch{if(state.result===copiedResult)copyError.value=true}}
function download() {const url=URL.createObjectURL(new Blob([state.result.text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='transcript-preview.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);track('preview_download')}
onMounted(()=>{
  controller.init()
  panelObserver=new ResizeObserver(()=>{
    if(panel.value&&panelContent.value) panel.value.style.height=`${panelContent.value.getBoundingClientRect().height+2}px`
  })
  panelObserver.observe(panelContent.value)
})
onBeforeUnmount(()=>{controller.dispose();panelObserver?.disconnect();clearTimeout(notificationTimer)})
</script>

<style scoped>
.preview-section{padding:80px 0;background:linear-gradient(180deg,var(--color-surface),#edf3ff 45%,var(--color-surface));scroll-margin-top:100px}
html[data-theme='dark'] .preview-section{background:linear-gradient(180deg,#0f172a,#142442,#0f172a)}
.preview-container{max-width:1000px;margin:0 auto;padding:0 24px}
.section-heading{text-align:center;margin-bottom:32px}.eyebrow{font-size:11px;letter-spacing:.13em;font-weight:700;color:var(--color-text-secondary)}
h2{font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;letter-spacing:-.03em;line-height:1.2;color:var(--color-text);margin:12px 0}
.section-heading p{font-size:1.125rem;line-height:1.6;color:var(--color-text-secondary);margin:0}.mobile-break{display:none}
.preview-panel{border:1px solid var(--color-border);background:var(--color-surface-elevated);border-radius:24px;box-sizing:border-box;overflow:hidden;transition:height .36s cubic-bezier(.22,1,.36,1);box-shadow:0 12px 42px #2563eb0a}
.preview-content{padding:24px}
.file-area{border:2px dashed var(--color-border);border-radius:16px;padding:24px 20px;text-align:center;background:linear-gradient(180deg,#3b82f614,#2563eb0a);transition:border-color .2s,background .2s,box-shadow .2s;cursor:pointer}
.file-area:hover,.file-area:focus-within{border-color:var(--accent-primary)}
.file-area svg{color:var(--accent-primary)}.file-area.is-dragging{border-color:var(--accent-primary);box-shadow:inset 0 0 0 2px var(--accent-primary)}
.drop-heading,.file-name{font-size:18px;font-weight:600;color:var(--color-text);margin:14px 0}.file-name{overflow-wrap:anywhere}
.file-size,.small-note,.format-list{font-size:12px;line-height:1.6;color:var(--color-text-secondary)}.format-list{max-width:560px;margin:8px auto 0;font-size:11px}.file-size{margin:-5px 0 15px}
.file-actions{display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;margin:12px 0}
.choose-file,.result-actions button{border:1px solid var(--color-border);background:var(--color-surface-elevated);border-radius:9px;color:var(--color-text);padding:11px 18px;cursor:pointer;font-weight:600;min-height:44px}
.choose-file{position:relative}.choose-file:focus-within,button:focus-visible,a:focus-visible{outline:3px solid var(--accent-primary);outline-offset:4px}.is-disabled{opacity:.6;cursor:default}
.primary-link{display:inline-flex;align-items:center;justify-content:center;gap:16px;background:#2563eb;color:#fff;border:0;border-radius:10px;padding:13px 20px;font-size:14px;font-weight:600;min-height:46px;text-decoration:none;cursor:pointer}
.primary-link:hover:not(:disabled){background:#1d4ed8}.primary-link:disabled{opacity:.55;cursor:not-allowed}
.text-button{background:transparent;border:0;color:var(--color-text-secondary);cursor:pointer;text-decoration:underline;min-height:44px}
.submit-row{display:flex;justify-content:flex-end;align-items:center;gap:24px;margin-top:22px}.processing-note{font-size:12px;line-height:1.6;color:var(--color-text-secondary)}.processing-note p{margin:0}.processing-note a,.complete-note a{color:var(--accent-primary);text-underline-offset:3px}
.progress-area{display:grid;gap:10px;font-size:14px;color:var(--color-text);margin-top:20px}progress{width:100%;height:8px;accent-color:#2563eb}
.error-message{color:#b42318;background:#fff1ef;padding:14px;border-radius:10px;font-size:14px;line-height:1.5;margin:18px 0 0}
.result{margin-top:30px;padding-top:28px;border-top:1px solid var(--color-border)}.result-heading{display:flex;justify-content:space-between;gap:20px;align-items:center}.result h3{margin:6px 0;font-size:21px;color:var(--color-text)}.result-actions{display:flex;gap:8px;flex-wrap:wrap}.result-actions button{font-size:12px;padding:10px 14px}
.transcript-text{font-size:16px;line-height:1.85;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--color-text);margin:24px 0;user-select:text}
.continuation{text-align:center;position:relative;border-radius:14px;padding:20px 24px;background:var(--color-surface)}.blur-lines{display:grid;gap:8px;filter:blur(4px);opacity:.18;max-width:640px;margin:0 auto 18px}.blur-lines span{height:8px;background:var(--color-text-secondary);border-radius:8px}.blur-lines span:nth-child(2){width:90%}.blur-lines span:nth-child(3){width:67%}.continuation-copy p,.complete-note p{font-size:14px;line-height:1.6;color:var(--color-text-secondary)}.continuation .primary-link{margin-top:8px}.continuation .small-note{margin-bottom:0}.complete-note{border-top:1px solid var(--color-border);padding-top:14px;font-size:14px}
.service-status{text-align:center;margin:18px 0 0;font-size:.875rem;line-height:1.6;color:var(--color-text-secondary)}.availability-detail{display:block}.preview-panel button,.preview-panel input{font-family:inherit}
.compat-strip{margin-top:28px;text-align:center;color:var(--color-text-secondary);font-size:12px}.compat-logos{display:flex;justify-content:center;gap:26px;flex-wrap:wrap;margin-top:20px}.compat-logos>div{display:flex;align-items:center;gap:8px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:640px){.preview-section{padding:56px 0}.preview-container{padding:0 16px}.preview-panel{border-radius:18px}.preview-content{padding:14px}.file-area{padding:20px 12px}.submit-row,.result-heading{align-items:stretch;flex-direction:column;gap:16px}.submit-row .primary-link{width:100%}.section-heading p{font-size:1.125rem}.mobile-break{display:block}.continuation{padding:18px 12px}.compat-logos{gap:18px}.processing-note{text-align:center}.result-actions button{flex:1}.unavailable{padding:12px}}
.selected-file{position:relative;width:fit-content;max-width:calc(100% - 88px);text-align:center;margin:12px auto}
.file-info{min-width:0}.selected-file .file-name{margin:0 0 8px;line-height:1.4}.selected-file .file-size{margin:0}
.remove-file{position:absolute;left:calc(100% + 6px);top:-7px;display:grid;place-items:center;width:40px;height:40px;border:0;border-radius:10px;background:transparent;color:var(--color-text-secondary);cursor:pointer}.remove-file:hover:not(:disabled){background:var(--color-border)}.remove-file:disabled{opacity:.5;cursor:default}.remove-file svg{color:inherit}
.file-action-enter-active{transition:opacity .28s ease,transform .36s cubic-bezier(.22,1,.36,1)}
.file-action-leave-active{transition:opacity .12s ease,transform .12s ease}
.file-action-enter-from{opacity:0;transform:translateY(10px) scale(.96)}
.file-action-leave-to{opacity:0;transform:translateY(-5px) scale(.98)}
@media(prefers-reduced-motion:reduce){.preview-panel,.file-action-enter-active,.file-action-leave-active{transition:none}.file-action-enter-from,.file-action-leave-to{transform:none}}
</style>

<style scoped>
.file-area.has-file{cursor:default}
.file-area:hover,.file-area:focus-visible{border-color:var(--accent-primary);background:linear-gradient(180deg,#3b82f61f,#2563eb0f);box-shadow:0 4px 16px #2563eb26}
.file-area:focus-visible{outline:3px solid var(--accent-primary);outline-offset:4px}
.drop-heading{font-size:20px;font-weight:700;color:var(--accent-primary);margin:12px 0 4px}
.drop-sub{font-size:15px;color:var(--color-text-secondary);margin:0 0 16px}
.file-actions.is-empty{margin:0}
.formats-label{font-size:11px;text-transform:uppercase;font-weight:600;color:var(--color-text-secondary);margin:0 0 8px}
.format-list{display:flex;justify-content:center;flex-wrap:wrap;gap:6px;max-width:560px;margin:0 auto}
.format-list span{padding:3px 9px;border:1px solid var(--color-border);border-radius:7px;background:var(--color-surface-elevated);font-weight:600;color:var(--color-text);font-size:11px}
.size-badge{display:table;margin:12px auto 0;padding:5px 12px;border:1px solid var(--color-border);border-radius:10px;color:var(--accent-primary);font-size:12px;font-weight:600}
</style>

<style scoped>
.upload-progress{width:min(100%,420px);display:grid;gap:12px;padding:8px 0 2px;color:var(--color-text)}
.progress-label{font-size:14px;font-weight:600}
.progress-track{height:8px;overflow:hidden;border-radius:999px;background:var(--color-border);isolation:isolate}
.progress-fill{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#2563eb,#8b5cf6);transition:width .2s ease}
.is-processing .progress-fill{width:38%;animation:transcribing 1.7s ease-in-out infinite}
.progress-hint{font-size:12px;line-height:1.5;color:var(--color-text-secondary)}
.result-heading{justify-content:flex-end}
.complete-note{display:flex;align-items:center;gap:24px;padding:24px;margin-top:24px;border:1px solid var(--color-border);border-radius:16px;background:linear-gradient(120deg,#2563eb0d,#8b5cf612)}
.extension-copy{flex:1;min-width:0}.complete-note .extension-title{font-size:18px;font-weight:700;color:var(--color-text);margin:0 0 8px;line-height:1.4}
.extension-copy p{margin:0}
.complete-note .extension-cta{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;padding:14px 23px;min-height:48px;border-radius:12px;background:linear-gradient(110deg,#2563eb,#6d28d9);color:#fff;text-decoration:none;font-size:15px;font-weight:700;box-shadow:0 5px 18px #4f46e530;transition:box-shadow .2s,filter .2s}
.complete-note .extension-cta:hover{filter:brightness(1.06) saturate(1.05);box-shadow:0 8px 24px #4f46e550}
@keyframes transcribing{0%{transform:translateX(-110%)}100%{transform:translateX(365%)}}
@media(max-width:640px){.complete-note{flex-direction:column;align-items:stretch;gap:18px;padding:20px}.extension-cta{width:100%;box-sizing:border-box}.upload-progress{width:100%}}
@media(prefers-reduced-motion:reduce){.is-processing .progress-fill{animation:none;width:100%;opacity:.65}.progress-fill,.complete-note .extension-cta{transition:none}.complete-note .extension-cta:hover{transform:none}}
</style>

<style scoped>
.result-actions button{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:13px;border-color:color-mix(in srgb,var(--accent-primary) 35%,var(--color-border));background:color-mix(in srgb,var(--accent-primary) 8%,var(--color-surface-elevated));transition:background .16s,border-color .16s,box-shadow .16s;color:var(--color-text)}
.result-actions button svg{width:17px;height:17px;flex-shrink:0;color:var(--accent-primary)}
.result-actions button:hover{border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 17%,var(--color-surface-elevated));box-shadow:0 3px 12px #2563eb20}
.result-actions button:active{background:color-mix(in srgb,var(--accent-primary) 24%,var(--color-surface-elevated));box-shadow:none}
.complete-note .extension-cta{position:relative;overflow:hidden;isolation:isolate;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%)}
.extension-cta::before{content:"";position:absolute;z-index:1;top:-50%;left:-70%;width:42%;height:200%;pointer-events:none;transform:skewX(-20deg);background:linear-gradient(90deg,transparent 0%,#ffffff14 25%,#ffffff61 50%,#ffffff14 75%,transparent 100%);animation:extension-cta-shimmer 3s ease-in-out infinite}
.cta-label{position:relative;z-index:2}
@keyframes extension-cta-shimmer{0%,20%{left:-70%}60%,100%{left:130%}}
.copy-notification{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:1000;max-width:calc(100vw - 32px);box-sizing:border-box;border:1px solid #86efac55;border-radius:12px;background:#14532d;color:#fff;box-shadow:0 8px 28px #0003;font-family:inherit;font-size:14px;font-weight:600;line-height:1.5;opacity:0;pointer-events:none;transition:opacity .18s}
.copy-notification.is-visible{opacity:1;padding:12px 18px}.copy-notification span{white-space:nowrap}
@media(prefers-reduced-motion:reduce){.extension-cta::before{animation:none;display:none}.result-actions button,.copy-notification{transition:none}}
</style>
