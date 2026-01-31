<template>
  <MockupWindow title="AI Summary">
    <div class="summary-mockup">
      <div class="summary-header">
        <svg class="sparkle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="var(--accent-primary)" />
        </svg>
        <span class="summary-title">Summary</span>
      </div>
      <ul class="summary-points">
        <li>User engagement metrics improved significantly this quarter</li>
        <li>40% increase in daily active users vs. previous period</li>
        <li>Retention numbers strong across all cohorts</li>
        <li>Team plans to double down on onboarding improvements</li>
      </ul>
      <div class="topics">
        <span class="topic-label">Key Topics</span>
        <div class="topic-pills">
          <span class="pill">User Engagement</span>
          <span class="pill">Growth Metrics</span>
          <span class="pill">Retention</span>
          <span class="pill">Onboarding</span>
        </div>
      </div>
    </div>
  </MockupWindow>
</template>

<script setup lang="ts">
import MockupWindow from './MockupWindow.vue'
</script>

<style scoped>
.summary-mockup {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sparkle-icon {
  flex-shrink: 0;
}

.summary-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}

.summary-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-points li {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  padding-left: 20px;
  position: relative;
}

.summary-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
}

.topics {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-border-light);
}

.topic-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.topic-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: var(--accent-primary-light);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary-light-border);
}
</style>
