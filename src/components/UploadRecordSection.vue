<template>
  <section id="try-transcription" class="preview-section" aria-labelledby="preview-title">
    <div class="preview-container">
      <div class="section-heading">
        <h2 id="preview-title">Turn your audio into text</h2>
        <p>Try it free. No account or installation needed.</p>
      </div>

      <div class="preview-panel ym-hide-content">
        <div class="preview-content">
        <noscript><p>Enable JavaScript to select a file and use the demo.</p></noscript>
        <form @submit.prevent="submit" :aria-busy="busy">
          <input ref="fileInput" class="sr-only" tabindex="-1" type="file" :accept="accept" aria-label="Select an audio or video file" @change="choose" />
          <div class="file-area" :class="{'has-file': state.file, 'is-dragging': dragging}" @dragover.prevent @drop.prevent>
            <div class="file-track">
              <button ref="dropArea" type="button" class="file-pane drop-pane" :inert="!!state.file" :aria-hidden="state.file ? 'true' : undefined" aria-label="Select an audio or video file" @click="openFileDialog" @dragover.prevent="dragging = canChoose && !state.file" @dragleave.prevent="dragging = false" @drop.prevent.stop="drop">
                <svg class="upload-icon" aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m-4 4 4-4 4 4M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></svg>
                <span class="drop-heading">Drop your audio or video here</span>
                <span class="drop-sub">or click to choose a file</span>
                <span class="size-badge">Max {{ maxSize }} MB</span>
              </button>
              <div class="file-pane selected-pane" :inert="!state.file" :aria-hidden="state.file ? undefined : 'true'">
                <button class="remove-file" type="button" :disabled="busy" aria-label="Remove file" @click="remove">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" d="m6 6 12 12M6 18 18 6" /></svg>
                </button>
                <div class="file-icon" aria-hidden="true">
                  <svg viewBox="0 0 40 48" fill="none"><path d="M8 2h17l12 12v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="1.8"/><path d="M25 2v9a4 4 0 0 0 4 4h8" stroke="currentColor" stroke-width="1.8"/></svg>
                  <span>{{ fileExtension }}</span>
                </div>
                <div class="file-info">
                  <p class="file-name" :title="displayFile?.name">{{ displayFile?.name }}</p>
                  <p class="file-size">{{ displayFile ? formatSize(displayFile.size) : '' }}<template v-if="!readingDuration"> · {{ shownDuration }}</template></p>
                </div>
                <div class="file-actions">
                  <div v-if="state.status === 'uploading'" class="upload-progress">
                    <span class="progress-label" role="status" aria-live="polite">Uploading your file… {{ state.progress }}%</span>
                    <div class="progress-track" role="progressbar" aria-label="File upload progress" :aria-valuenow="state.progress" aria-valuemin="0" aria-valuemax="100"><span class="progress-fill" :style="{width: `${state.progress}%`}"></span></div>
                  </div>
                  <div v-else-if="state.status === 'processing' || (state.file && readingDuration)" class="processing-status" role="status" aria-live="polite"><span class="spinner" aria-hidden="true"></span>{{ state.status === 'processing' ? 'Transcribing your recording…' : 'Reading your file…' }}</div>
                  <div v-else-if="state.errorCode === 'DAILY_PREVIEW_LIMIT'" class="demo-limit" role="status">
                    <p class="limit-heading">Keep transcribing in Chrome</p>
                    <p class="limit-description">You’ve reached the free demo limit. Continue in the Chrome extension.</p>
                    <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="extension-cta limit-cta" @click="track('preview_limit_extension_click')"><span class="cta-label">Add to Chrome</span></a>
                  </div>
                  <template v-else-if="state.error && state.file">
                    <p class="error-message" role="alert"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v6m0 3v1"/></svg><span>{{ state.error }}</span></p>
                    <button class="retry-button" type="submit">Try again</button>
                  </template>
                  <span v-else-if="state.result" class="success-status" role="status">✓ Transcript ready</span>
                  <button v-else class="primary-link transcribe-button" type="submit">Transcribe</button>
                </div>
              </div>
            </div>
          </div>
          <p v-if="state.error && !state.file" class="error-message validation-error" role="alert">{{ state.error }}</p>
        </form>

        <div v-if="state.result" class="result" role="region" aria-label="Transcript">
          <div class="result-heading">
            <div class="result-actions"><button type="button" @click="copy"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>{{ actionStatus ? 'Copied!' : 'Copy text' }}</button></div>
          </div>
          <div class="transcript-scroll" tabindex="0" role="region" aria-label="Transcript text"><p class="transcript-text">{{ state.result.text }}</p></div>
          <Teleport to="body"><div class="copy-notification" :class="{'is-visible': actionStatus}" role="status" aria-live="polite" aria-atomic="true"><span v-if="actionStatus"><span aria-hidden="true">✓</span> {{ actionStatus }}</span></div></Teleport>
          <p v-if="copyError" class="small-note" role="alert">Select the transcript above to copy it. Your browser could not access the clipboard.</p>
          <div class="complete-note">
            <div class="extension-copy">
              <p class="extension-title">Do more with your transcript</p>
              <ul class="extension-benefits">
                <li>Edit your transcript</li>
                <li>Transcribe in the background and get an email when it’s ready</li>
                <li>Download your transcript as a file</li>
                <li>Get an AI summary of your recording</li>
                <li>See your past transcripts</li>
                <li>Get automatic timestamps</li>
              </ul>
            </div>
            <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="extension-cta" @click="track('preview_extension_click')"><span class="cta-label">Add to Chrome</span></a>
          </div>
        </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import {computed,onMounted,onBeforeUnmount,reactive,ref,watch,nextTick} from 'vue'
import {createPreviewController,initialPreviewState,previewFileDefaults} from '../lib/transcriptionPreview.mjs'
const state=reactive(initialPreviewState())
const controller=createPreviewController({state})
const dropArea=ref(null)
const fileInput=ref(null), dragging=ref(false), actionStatus=ref(''),copyError=ref(false)
const duration=ref(null), readingDuration=ref(false)
const lastFile=ref(null), lastDuration=ref('Duration unavailable')
const displayFile=computed(()=>state.file || lastFile.value)
const fileExtension=computed(()=>displayFile.value?.name.split('.').pop().toUpperCase() || '')
const shownDuration=computed(()=>state.file ? durationLabel.value : lastDuration.value)
let notificationTimer
const durationLabel=computed(()=>{
  if(readingDuration.value) return 'Reading duration…'
  if(duration.value===null) return 'Duration unavailable'
  const seconds=Math.round(duration.value)
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} min`
})
watch(()=>state.file,(file,previous,onCleanup)=>{
  clearTimeout(notificationTimer);actionStatus.value='';copyError.value=false
  duration.value=null
  readingDuration.value=!!file
  if(!file) return
  lastFile.value=file
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
function drop(event) { dragging.value=false; if(canChoose.value && !state.file) { if(event.dataTransfer.files.length!==1) {state.error='Choose one file at a time.';return} select(event.dataTransfer.files[0]) } }
function openFileDialog() { if(canChoose.value && !state.file) fileInput.value?.click() }
async function remove() { if(busy.value)return;lastDuration.value=durationLabel.value;controller.select(null);await nextTick();dropArea.value?.focus({preventScroll:true}) }
async function submit() { if(busy.value||readingDuration.value||!state.file)return; track('preview_started');await controller.submit();track(state.status==='success'?'preview_succeeded':'preview_failed') }
function formatSize(bytes) {return bytes<1024*1024?`${Math.ceil(bytes/1024)} KB`:`${(bytes/1024/1024).toFixed(1)} MB`}
async function copy() {const copiedResult=state.result;if(!copiedResult)return;copyError.value=false;actionStatus.value='';try {await navigator.clipboard.writeText(copiedResult.text);if(state.result!==copiedResult)return;clearTimeout(notificationTimer);actionStatus.value='Transcript copied to clipboard';notificationTimer=setTimeout(()=>{actionStatus.value=''},3000);track('preview_copy')}catch{if(state.result===copiedResult)copyError.value=true}}
onMounted(()=>controller.init())
onBeforeUnmount(()=>{controller.dispose();clearTimeout(notificationTimer)})
</script>

<style scoped>
.preview-section{padding:80px 0;background:var(--color-background);scroll-margin-top:100px}
.preview-container{max-width:1000px;margin:0 auto;padding:0 24px}
.section-heading{text-align:center;margin-bottom:32px}
h2{font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;letter-spacing:-.03em;line-height:1.2;color:var(--color-text);margin:12px 0}
.section-heading p{font-size:1.125rem;line-height:1.6;color:var(--color-text-secondary);margin:0}
.preview-panel{max-width:820px;margin:0 auto}
.preview-panel button,.preview-panel input{font-family:inherit}
.file-area{height:164px;box-sizing:border-box;overflow:hidden;border:2px dashed var(--color-border);border-radius:16px;background:var(--color-surface);transition:border-color .2s,background .2s}
.file-area.has-file{border-style:solid;background:var(--color-surface-elevated)}
.file-area:not(.has-file):hover,.file-area.is-dragging{border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 6%,var(--color-surface))}
.file-area:has(.drop-pane:focus-visible){outline:3px solid var(--accent-primary);outline-offset:4px}
.file-track{display:flex;width:200%;transform:translateX(0);transition:transform .52s cubic-bezier(.22,1,.36,1)}
.has-file .file-track{transform:translateX(-50%)}
.file-pane{box-sizing:border-box;width:50%;height:160px;padding:16px;flex-shrink:0;color:var(--color-text)}
.drop-pane{display:flex;flex-direction:column;justify-content:center;align-items:center;border:0;background:transparent;cursor:pointer;outline:none;text-align:center}
.upload-icon{flex-shrink:0;color:var(--accent-primary);margin-bottom:10px}
.drop-heading{font-size:18px;font-weight:500;line-height:1.3;letter-spacing:-.2px}
.drop-sub{font-size:14px;line-height:1.3;color:var(--color-text-secondary);margin:6px 0 10px}
.size-badge{font-size:12px;line-height:1.3;color:var(--color-text-secondary)}
.selected-pane{position:relative;display:grid;grid-template-columns:42px minmax(0,max-content);grid-template-rows:auto auto;align-content:center;align-items:center;justify-content:center;gap:14px 12px;text-align:center}
.file-icon{position:relative;width:42px;height:48px;color:var(--color-border-strong)}
.file-icon svg{width:40px;height:48px}
.file-icon span{position:absolute;left:-3px;bottom:7px;padding:5px 4px;min-width:30px;box-sizing:border-box;border-radius:3px;background:#2563eb;color:#fff;font-size:10px;font-weight:700;line-height:1;letter-spacing:.2px}
.file-info{min-width:0}
.file-name{max-width:min(420px,calc(100vw - 170px));margin:0;font-size:16px;font-weight:500;line-height:1.4;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
.file-size{margin:4px 0 0;font-size:13px;line-height:1.4;color:var(--color-text-secondary)}
.remove-file{position:absolute;right:10px;top:10px;display:grid;place-items:center;width:28px;height:28px;border:0;border-radius:8px;background:transparent;color:var(--color-text-secondary);cursor:pointer}
.remove-file:hover:not(:disabled){background:var(--color-border);color:var(--color-text)}
.remove-file:disabled{opacity:.4;cursor:default}
.file-actions{grid-column:1 / -1;justify-self:center;width:100%;max-width:520px;min-width:0;text-align:center}
.primary-link{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:200px;max-width:100%;min-height:40px;padding:10px 24px;border:0;border-radius:11px;background:#2563eb;color:#fff;font-size:14px;font-weight:500;cursor:pointer;transition:background .15s,box-shadow .15s}
.primary-link:hover{background:#1d4ed8;box-shadow:0 3px 12px #2563eb24}
.primary-link:active{box-shadow:none}
.processing-status{display:flex;justify-content:center;align-items:center;gap:8px;color:var(--color-text-secondary);font-size:13px;line-height:1.5}
.spinner{display:inline-block;box-sizing:border-box;width:16px;height:16px;flex-shrink:0;border:2px solid var(--color-border);border-top-color:var(--accent-primary);border-radius:50%;animation:preview-spin .8s linear infinite}
@keyframes preview-spin{to{transform:rotate(360deg)}}
.upload-progress{width:100%;min-width:180px;max-width:430px;margin:auto}
.progress-label{font-size:13px;line-height:1.5;color:var(--color-text-secondary)}
.progress-track{height:6px;margin-top:10px;border-radius:10px;overflow:hidden;background:var(--color-border)}
.progress-fill{display:block;height:100%;border-radius:inherit;background:var(--accent-primary);transition:width .2s}
.error-message{display:flex;align-items:flex-start;justify-content:center;gap:7px;margin:0 0 6px;font-size:13px;line-height:1.5;color:var(--color-text-secondary);text-align:center}
.error-message svg{width:17px;height:17px;flex-shrink:0;color:var(--color-error);margin-top:1px}
.error-message span{max-height:40px;overflow-y:auto;overflow-wrap:anywhere;scrollbar-width:thin}
.retry-button{min-height:24px;padding:0;border:0;border-radius:4px;background:transparent;color:var(--accent-primary);font-size:13px;font-weight:500;cursor:pointer}
.retry-button:hover{text-decoration:underline}
.demo-limit{text-align:center}
.limit-heading{margin:0 0 3px;font-size:15px;font-weight:700;color:var(--color-text)}
.limit-description{margin:0 0 8px;font-size:12px;line-height:1.4;color:var(--color-text-secondary)}
.extension-cta.limit-cta{min-height:34px;padding:7px 20px;font-size:13px}
.validation-error{margin:12px 0 0;color:var(--color-error)}
.success-status{font-size:13px;line-height:1.5;color:#15803d}
:global(html[data-theme='dark']) .success-status{color:#86efac}
.result{margin-top:20px}
.result-heading{display:flex;align-items:center;margin-bottom:12px}
.result-actions button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:8px 12px;border:1px solid color-mix(in srgb,var(--accent-primary) 35%,var(--color-border));border-radius:9px;background:color-mix(in srgb,var(--accent-primary) 8%,var(--color-surface-elevated));color:var(--color-text);font-size:13px;font-weight:500;cursor:pointer;transition:background .16s,border-color .16s,box-shadow .16s}
.result-actions button svg{width:17px;height:17px;flex-shrink:0;color:var(--accent-primary)}
.result-actions button:hover{border-color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 17%,var(--color-surface-elevated));box-shadow:0 3px 12px #2563eb20}
.result-actions button:active{box-shadow:none}
.transcript-scroll{box-sizing:border-box;max-height:300px;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface);padding:20px 24px;scrollbar-width:thin;scrollbar-color:var(--color-border-strong) transparent}
.transcript-text{margin:0;font-size:15px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--color-text);user-select:text}
.small-note{font-size:13px;line-height:1.5;color:var(--color-text-secondary)}
.complete-note{display:flex;align-items:center;gap:24px;padding:24px;margin-top:24px;border:1px solid var(--color-border);border-radius:16px;background:linear-gradient(120deg,#2563eb0d,#8b5cf612)}
.extension-copy{flex:1;min-width:0}
.extension-copy .extension-title{font-size:18px;font-weight:700;color:var(--color-text);margin:0 0 8px;line-height:1.4}
.extension-copy p{font-size:14px;line-height:1.6;color:var(--color-text-secondary);margin:0}
.extension-benefits{margin:0;padding-left:20px;color:var(--color-text-secondary);font-size:14px;line-height:1.6}
.extension-benefits li+li{margin-top:5px}
.extension-benefits li::marker{color:var(--accent-primary)}
.extension-cta{position:relative;overflow:hidden;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;padding:14px 23px;min-height:48px;box-sizing:border-box;border-radius:12px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);color:#fff;text-decoration:none;font-size:15px;font-weight:700;box-shadow:0 5px 18px #4f46e530;transition:box-shadow .2s,filter .2s}
.extension-cta:hover{filter:brightness(1.06);box-shadow:0 8px 24px #4f46e550}
.extension-cta::before{content:"";position:absolute;z-index:1;top:-50%;left:-70%;width:42%;height:200%;pointer-events:none;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,#ffffff61,transparent);animation:extension-cta-shimmer 3s ease-in-out infinite}
.cta-label{position:relative;z-index:2}
@keyframes extension-cta-shimmer{0%,20%{left:-70%}60%,100%{left:130%}}
.copy-notification{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:1000;max-width:calc(100vw - 32px);box-sizing:border-box;border:1px solid #86efac55;border-radius:12px;background:#14532d;color:#fff;box-shadow:0 8px 28px #0003;font-family:inherit;font-size:14px;font-weight:600;line-height:1.5;opacity:0;pointer-events:none;transition:opacity .18s}
.copy-notification.is-visible{opacity:1;padding:12px 18px}
.copy-notification span{white-space:nowrap}
button:focus-visible,a:focus-visible,.transcript-scroll:focus-visible{outline:3px solid var(--accent-primary);outline-offset:4px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:640px){.preview-section{padding:56px 0}.preview-container{padding:0 16px}.file-area{height:184px}.file-pane{height:180px}.selected-pane{grid-template-columns:36px minmax(0,max-content);gap:14px 10px}.file-icon{width:36px}.file-icon svg{width:36px}.file-name{font-size:15px}.remove-file{right:8px;top:8px}.transcript-scroll{max-height:260px;padding:16px}.transcript-text{font-size:14px}.complete-note{flex-direction:column;align-items:stretch;gap:18px;padding:20px}.extension-cta{width:100%}}
@media(prefers-reduced-motion:reduce){.file-track,.file-area,.progress-fill,.primary-link,.result-actions button,.copy-notification,.extension-cta{transition:none}.spinner{animation:none}.extension-cta::before{animation:none;display:none}}
</style>
