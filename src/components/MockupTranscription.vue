<template>
  <MockupWindow title="Audio To Text Transcription">
    <div class="transcription-mockup">
      <div class="recording-bar">
        <span class="rec-dot" />
        <span class="rec-label">Recording...</span>
        <span class="rec-timer">02:34</span>
      </div>
      <div class="waveform">
        <span
          v-for="i in 20"
          :key="i"
          class="wave-bar"
          :style="{ height: barHeights[i - 1] + '%', animationDelay: (i * 0.05) + 's' }"
        />
      </div>
      <div class="transcript-lines">
        <div class="transcript-line">
          <span class="timestamp">00:02:15</span>
          <span class="text-line">So the key takeaway from this quarter is that our user engagement metrics have significantly improved...</span>
        </div>
        <div class="transcript-line">
          <span class="timestamp">00:02:28</span>
          <span class="text-line">We saw a 40% increase in daily active users compared to the previous period.</span>
        </div>
        <div class="transcript-line typing">
          <span class="timestamp">00:02:34</span>
          <span class="text-line">And the retention numbers are looking really strong across all<span class="cursor" /></span>
        </div>
      </div>
    </div>
  </MockupWindow>
</template>

<script setup lang="ts">
import MockupWindow from './MockupWindow.vue'

const barHeights = [30, 55, 40, 75, 50, 85, 45, 60, 90, 35, 70, 55, 80, 40, 65, 50, 85, 45, 60, 75]
</script>

<style scoped>
.transcription-mockup {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recording-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--accent-primary-light);
  border-radius: var(--radius-sm);
}

.rec-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #EF4444;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.rec-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-primary);
}

.rec-timer {
  margin-left: auto;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.waveform {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 48px;
  padding: 0 8px;
}

.wave-bar {
  width: 3px;
  min-height: 4px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite alternate;
}

@keyframes wave {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

.transcript-lines {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transcript-line {
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
}

.timestamp {
  color: var(--color-text-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  padding-top: 2px;
}

.text-line {
  color: var(--color-text);
}

.typing .text-line {
  color: var(--color-text-secondary);
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: var(--accent-primary);
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: blink 0.8s steps(2) infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
