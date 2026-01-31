<template>
  <MockupWindow title="Upload Audio">
    <div class="upload-mockup">
      <div class="drop-zone">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="drop-text">Drop audio file here or click to browse</span>
        <span class="drop-hint">Supports MP3, WAV, FLAC, OGG, M4A and more</span>
      </div>

      <div class="format-pills">
        <span class="format-pill">MP3</span>
        <span class="format-pill">WAV</span>
        <span class="format-pill">FLAC</span>
        <span class="format-pill">OGG</span>
        <span class="format-pill">M4A</span>
        <span class="format-pill">WebM</span>
      </div>

      <div class="progress-section">
        <div class="progress-header">
          <span class="file-name">meeting-recording.mp3</span>
          <span class="progress-pct">100%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" />
        </div>
        <div class="progress-status">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#28C840" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="status-text">Transcription complete</span>
        </div>
      </div>

      <div class="export-row">
        <span class="export-label">Export as:</span>
        <button class="export-btn active">TXT</button>
        <button class="export-btn">DOCX</button>
        <button class="export-btn">SRT</button>
      </div>
    </div>
  </MockupWindow>
</template>

<script setup lang="ts">
import MockupWindow from './MockupWindow.vue'
</script>

<style scoped>
.upload-mockup {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  text-align: center;
  transition: border-color 0.2s ease;
}

.drop-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.drop-hint {
  font-size: 11px;
  color: var(--color-text-muted);
}

.format-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.format-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background: var(--accent-primary-light);
  color: var(--accent-primary);
  letter-spacing: 0.03em;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.progress-pct {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-primary);
}

.progress-track {
  height: 6px;
  background: var(--color-border-light);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 100%;
  background: var(--accent-primary);
  border-radius: 3px;
}

.progress-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  color: #28C840;
}

.export-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-border-light);
}

.export-label {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.export-btn {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn.active {
  background: var(--accent-primary);
  color: #fff;
  border-color: var(--accent-primary);
}
</style>
