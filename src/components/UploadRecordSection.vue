<template>
  <section id="try-transcription" class="preview-section" aria-labelledby="preview-title">
    <div class="preview-container">
      <div class="section-heading">
        <span class="eyebrow">TRY IT WITH YOUR FILE</span>
        <h2 id="preview-title">Turn your audio into text</h2>
        <p>Get the first minute transcribed for free.<br class="mobile-break" /> No account or installation needed.</p>
      </div>

      <div class="preview-panel ym-hide-content">
        <noscript><p>Enable JavaScript to use the online preview, or <a :href="storeUrl" target="_blank" rel="noopener noreferrer">get the Chrome extension</a>.</p></noscript>
        <p v-if="state.status === 'loading'" class="service-status" role="status">Checking preview availability…</p>
        <div v-else-if="state.status === 'disabled'" class="unavailable" role="status">
          <h3>The online preview is temporarily unavailable</h3>
          <p>{{ state.error || 'You can still upload and transcribe your files in the Chrome extension.' }}</p>
          <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="primary-link" @click="track('preview_extension_click')">Get the Chrome extension <span aria-hidden="true">↗</span></a>
          <p class="small-note">For Chrome on a computer · opens Chrome Web Store</p>
        </div>

        <form v-else @submit.prevent="submit" :aria-busy="busy">
          <div class="file-area" :class="{'is-dragging': dragging, 'has-file': state.file}" @dragover.prevent="dragging = !busy" @dragleave.prevent="dragging = false" @drop.prevent="drop">
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m-4 4 4-4 4 4M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></svg>
            <template v-if="state.file">
              <p class="file-name">{{ state.file.name }}</p>
              <p class="file-size">{{ formatSize(state.file.size) }} · only the first minute will be transcribed</p>
            </template>
            <p v-else class="drop-heading">Drop an audio or video file here</p>
            <div class="file-actions">
              <label class="choose-file" :class="{'is-disabled': busy}">
                {{ state.file ? 'Choose another file' : 'Choose a file' }}
                <input ref="fileInput" class="sr-only" type="file" :accept="accept" :disabled="busy" aria-describedby="preview-limits" @change="choose" />
              </label>
              <button v-if="state.file" class="text-button" type="button" :disabled="busy" @click="remove">Remove file</button>
            </div>
            <p id="preview-limits" class="small-note">Up to {{ maxSize }} MB · {{ state.config.dailyAttempts }} attempts per day per network (IP)</p>
            <p class="format-list">{{ state.config.supportedExtensions.map(value => value.toUpperCase()).join(' · ') }}</p>
          </div>
          <div class="submit-row">
            <div class="processing-note">
              <p>Only the first 60 seconds are sent for transcription.</p>
              <a href="/privacy/#web-preview">How your file is processed</a>
            </div>
            <button class="primary-link" type="submit" :disabled="busy || !state.file">{{ busy ? 'Transcribing…' : 'Transcribe first minute' }}<span v-if="!busy" aria-hidden="true">→</span></button>
          </div>
          <div v-if="busy" class="progress-area" role="status" aria-live="polite">
            <template v-if="state.status === 'uploading'">
              <span>Uploading your file… {{ state.progress }}%</span>
              <progress :value="state.progress" max="100" aria-label="File upload progress"></progress>
            </template>
            <span v-else>Transcribing the first minute. Keep this page open.</span>
          </div>
          <p v-if="state.error" class="error-message" role="alert">{{ state.error }}</p>
        </form>

        <div v-if="state.result" class="result" aria-labelledby="transcript-title">
          <div class="result-heading">
            <div><span class="eyebrow">{{ state.result.hasMoreAudio ? 'FIRST 60 SECONDS' : 'FULL TRANSCRIPT' }}</span><h3 id="transcript-title">Your transcript</h3></div>
            <div class="result-actions"><button type="button" @click="copy">Copy text</button><button type="button" @click="download">Download TXT</button></div>
          </div>
          <p class="transcript-text">{{ state.result.text }}</p>
          <p class="sr-only" role="status" aria-live="polite">{{ actionStatus }}</p>
          <p v-if="copyError" class="small-note" role="alert">Select the transcript above to copy it. Your browser could not access the clipboard.</p>
          <div v-if="state.result.hasMoreAudio" class="continuation">
            <div class="blur-lines" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="continuation-copy"><h3>Need the rest of your recording?</h3><p>Add the Chrome extension, then upload your file there to transcribe the full recording.</p></div>
            <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="primary-link" @click="track('preview_extension_click')">Add to Chrome <span aria-hidden="true">↗</span></a>
            <p class="small-note">Chrome on a computer · record browser audio, keep your history and get summaries</p>
          </div>
          <div v-else class="complete-note"><p>That’s your full recording. Need to transcribe longer files or record browser audio?</p><a :href="storeUrl" target="_blank" rel="noopener noreferrer" @click="track('preview_extension_click')">Get the extension for Chrome on a computer ↗</a></div>
        </div>
      </div>
      <div class="compat-strip"><p>For your meetings, lectures and interviews</p><div class="compat-logos"><div v-for="platform in platforms" :key="platform.name"><img :src="platform.img" alt="" width="28" height="28" loading="lazy" /><span>{{ platform.name }}</span></div></div></div>
    </div>
  </section>
</template>

<script setup>
import {computed,onMounted,onBeforeUnmount,reactive,ref} from 'vue'
import {createPreviewController,initialPreviewState} from '../lib/transcriptionPreview.mjs'
const state=reactive(initialPreviewState())
const controller=createPreviewController({state})
const fileInput=ref(null), dragging=ref(false), actionStatus=ref(''),copyError=ref(false)
const busy=computed(()=>['uploading','processing'].includes(state.status))
const maxSize=computed(()=>Math.round((state.config?.maxFileBytes||0)/1024/1024))
const accept=computed(()=>state.config?.supportedExtensions.map(value=>`.${value}`).join(',')||'')
const storeUrl='https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en&utm_source=site&utm_medium=referral&utm_content=web_preview'
const platforms=[{name:'Google Meet',img:'/logos/google-meet.svg'},{name:'Zoom',img:'/logos/zoom.svg'},{name:'MS Teams',img:'/logos/teams.svg'},{name:'YouTube',img:'/logos/youtube.svg'}]
function track(event) { try { if(typeof window.ym==='function') window.ym(105283733,'reachGoal',event) } catch { /* Analytics must never interrupt transcription. */ } }
function select(file) { controller.select(file); if(state.file) track('preview_file_selected') }
function choose(event) { select(event.target.files?.[0]||null); event.target.value='' }
function drop(event) { dragging.value=false; if(!busy.value) { if(event.dataTransfer.files.length!==1) {state.error='Choose one file at a time.';return} select(event.dataTransfer.files[0]) } }
function remove() { controller.select(null); fileInput.value?.focus() }
async function submit() { if(busy.value||!state.file)return; track('preview_started');await controller.submit();track(state.status==='success'?'preview_succeeded':'preview_failed') }
function formatSize(bytes) {return bytes<1024*1024?`${Math.ceil(bytes/1024)} KB`:`${(bytes/1024/1024).toFixed(1)} MB`}
async function copy() {copyError.value=false;try {await navigator.clipboard.writeText(state.result.text);actionStatus.value='Transcript copied.';track('preview_copy')}catch{copyError.value=true}}
function download() {const url=URL.createObjectURL(new Blob([state.result.text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='transcript-preview.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);track('preview_download')}
onMounted(()=>controller.init())
onBeforeUnmount(()=>controller.dispose())
</script>

<style scoped>
.preview-section{padding:80px 0;background:linear-gradient(180deg,var(--color-surface),#edf3ff 45%,var(--color-surface));scroll-margin-top:100px}
html[data-theme='dark'] .preview-section{background:linear-gradient(180deg,#0f172a,#142442,#0f172a)}
.preview-container{max-width:1000px;margin:0 auto;padding:0 24px}
.section-heading{text-align:center;margin-bottom:32px}.eyebrow{font-size:11px;letter-spacing:.13em;font-weight:700;color:var(--color-text-secondary)}
h2{font-size:clamp(1.8rem,3.8vw,2.6rem);line-height:1.2;color:var(--color-text);margin:12px 0}
.section-heading p{font-size:17px;line-height:1.6;color:var(--color-text-secondary);margin:0}.mobile-break{display:none}
.preview-panel{border:1px solid var(--color-border);background:var(--color-surface-elevated);border-radius:24px;padding:32px;box-shadow:0 12px 42px #2563eb0a}
.file-area{border:1px dashed var(--color-border);border-radius:16px;padding:32px 24px;text-align:center;background:var(--color-surface);transition:border-color .15s}
.file-area svg{color:var(--accent-primary)}.file-area.is-dragging{border-color:var(--accent-primary);box-shadow:inset 0 0 0 2px var(--accent-primary)}
.drop-heading,.file-name{font-size:18px;font-weight:600;color:var(--color-text);margin:14px 0}.file-name{overflow-wrap:anywhere}
.file-size,.small-note,.format-list{font-size:12px;line-height:1.6;color:var(--color-text-secondary)}.format-list{max-width:560px;margin:8px auto 0;font-size:11px}.file-size{margin:-5px 0 15px}
.file-actions{display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;margin:16px 0}
.choose-file,.result-actions button{border:1px solid var(--color-border);background:var(--color-surface-elevated);border-radius:9px;color:var(--color-text);padding:11px 18px;cursor:pointer;font-weight:600;min-height:44px}
.choose-file{position:relative}.choose-file:focus-within,button:focus-visible,a:focus-visible{outline:3px solid var(--accent-primary);outline-offset:4px}.is-disabled{opacity:.6;cursor:default}
.primary-link{display:inline-flex;align-items:center;justify-content:center;gap:16px;background:#2563eb;color:#fff;border:0;border-radius:10px;padding:13px 20px;font-size:14px;font-weight:600;min-height:46px;text-decoration:none;cursor:pointer}
.primary-link:hover:not(:disabled){background:#1d4ed8}.primary-link:disabled{opacity:.55;cursor:not-allowed}
.text-button{background:transparent;border:0;color:var(--color-text-secondary);cursor:pointer;text-decoration:underline;min-height:44px}
.submit-row{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-top:22px}.processing-note{font-size:12px;line-height:1.6;color:var(--color-text-secondary)}.processing-note p{margin:0}.processing-note a,.complete-note a{color:var(--accent-primary);text-underline-offset:3px}
.progress-area{display:grid;gap:10px;font-size:14px;color:var(--color-text);margin-top:20px}progress{width:100%;height:8px;accent-color:#2563eb}
.error-message{color:#b42318;background:#fff1ef;padding:14px;border-radius:10px;font-size:14px;line-height:1.5;margin:18px 0 0}
.result{margin-top:30px;padding-top:28px;border-top:1px solid var(--color-border)}.result-heading{display:flex;justify-content:space-between;gap:20px;align-items:center}.result h3{margin:6px 0;font-size:21px;color:var(--color-text)}.result-actions{display:flex;gap:8px;flex-wrap:wrap}.result-actions button{font-size:12px;padding:10px 14px}
.transcript-text{font-size:16px;line-height:1.85;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--color-text);margin:24px 0;user-select:text}
.continuation{text-align:center;position:relative;border-radius:14px;padding:20px 24px;background:var(--color-surface)}.blur-lines{display:grid;gap:8px;filter:blur(4px);opacity:.18;max-width:640px;margin:0 auto 18px}.blur-lines span{height:8px;background:var(--color-text-secondary);border-radius:8px}.blur-lines span:nth-child(2){width:90%}.blur-lines span:nth-child(3){width:67%}.continuation-copy p,.complete-note p{font-size:14px;line-height:1.6;color:var(--color-text-secondary)}.continuation .primary-link{margin-top:8px}.continuation .small-note{margin-bottom:0}.complete-note{border-top:1px solid var(--color-border);padding-top:14px;font-size:14px}
.service-status,.unavailable{text-align:center;padding:24px;color:var(--color-text-secondary)}.unavailable h3{color:var(--color-text);font-size:20px}.unavailable p{line-height:1.6}.unavailable .primary-link{margin:10px 0}
.compat-strip{margin-top:28px;text-align:center;color:var(--color-text-secondary);font-size:12px}.compat-logos{display:flex;justify-content:center;gap:26px;flex-wrap:wrap;margin-top:20px}.compat-logos>div{display:flex;align-items:center;gap:8px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:640px){.preview-section{padding:56px 0}.preview-container{padding:0 16px}.preview-panel{padding:18px;border-radius:18px}.file-area{padding:24px 12px}.submit-row,.result-heading{align-items:stretch;flex-direction:column;gap:16px}.submit-row .primary-link{width:100%}.section-heading p{font-size:15px}.mobile-break{display:block}.continuation{padding:18px 12px}.compat-logos{gap:18px}.processing-note{text-align:center}.result-actions button{flex:1}.unavailable{padding:12px}}
</style>
