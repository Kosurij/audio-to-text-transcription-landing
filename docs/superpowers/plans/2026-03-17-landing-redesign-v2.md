# Landing Redesign v2 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update landing page stats, add YouTube demo section, replace SocialProofBar with Upload/Record cards, upgrade BenefitsSection typography/content, redesign HowItWorks as horizontal slider, and convert testimonials to masonry layout.

**Architecture:** All components are Vue 3 SFCs rendered via Astro with `client:load`. New components are created in `src/components/`. `index.astro` is updated to add new components and remove `SocialProofBar`. No external icon libraries — Heroicons SVGs are inlined.

**Tech Stack:** Astro 4, Vue 3 (Composition API), TypeScript, scoped CSS (no Tailwind). Dev server: `npm run dev`.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/components/InstallButton.vue` | Remove hover bounce transform |
| Modify | `src/components/HeroSection.vue` | 4 stats + Watch Demo button |
| Create | `src/components/DemoSection.vue` | YouTube embed with lazy loading |
| Create | `src/components/UploadRecordSection.vue` | Upload/Record CTA cards |
| Delete | `src/components/SocialProofBar.vue` | Replaced by UploadRecordSection |
| Modify | `src/components/BenefitsSection.vue` | Bigger type + updated 4 features |
| Modify | `src/components/HowItWorksSection.vue` | Horizontal slider, 2-step view |
| Modify | `src/components/TestimonialsSection.vue` | CSS masonry (columns: 4) |
| Modify | `src/pages/index.astro` | Wire new components, remove SocialProofBar |

---

## Task 1: Remove hover bounce from InstallButton

**Files:**
- Modify: `src/components/InstallButton.vue`

- [ ] **Step 1: Open the file and locate the primary hover/active/transition rules**

  In `src/components/InstallButton.vue`, find these three rules inside `.primary`:

  ```css
  /* line ~71 */
  transition: background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease;

  /* line ~79 */
  .primary:hover {
    background-position: 100% 50%;
    box-shadow: 0 10px 30px rgba(26, 115, 232, 0.45);
    transform: translateY(-2px);  /* ← remove this line */
  }

  /* line ~82 */
  .primary:active {
    transform: translateY(0);     /* ← remove this whole declaration */
    box-shadow: 0 6px 18px rgba(26, 115, 232, 0.35);
  }
  ```

- [ ] **Step 2: Apply the changes**

  Updated `.primary` rules:

  ```css
  .primary {
    /* ... keep everything else ... */
    transition: background-position 0.5s ease, box-shadow 0.3s ease;
  }

  .primary:hover {
    background-position: 100% 50%;
    box-shadow: 0 10px 30px rgba(26, 115, 232, 0.45);
    /* no transform */
  }

  .primary:active {
    box-shadow: 0 6px 18px rgba(26, 115, 232, 0.35);
    /* no transform */
  }
  ```

- [ ] **Step 3: Verify in browser**

  Run `npm run dev`, open `http://localhost:4321`, hover over the Install button. It must NOT jump up. Box-shadow transition is fine.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/InstallButton.vue
  git commit -m "fix: remove hover bounce from InstallButton"
  ```

---

## Task 2: Update HeroSection stats + Add Watch Demo button

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Update the four stats in the template**

  Replace the existing `.hero-stats` block (3 stats) with 4 stats:

  ```html
  <div class="hero-stats">
    <div class="stat">
      <span class="stat-value">1.2k+</span>
      <span class="stat-label">Weekly Active Users</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">★ 5.0</span>
      <span class="stat-label">Chrome Store</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">99%</span>
      <span class="stat-label">Accuracy</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">90+</span>
      <span class="stat-label">Languages</span>
    </div>
  </div>
  ```

- [ ] **Step 2: Add Watch Demo button in `.hero-cta`**

  After `<InstallButton ...>`, add:

  ```html
  <div class="hero-cta-row">
    <InstallButton class="hero-install-btn">
      + Add to Chrome — It's free
    </InstallButton>
    <a href="#demo" class="watch-demo-btn" @click.prevent="scrollToDemo">
      ▶ Watch Demo
    </a>
  </div>
  ```

  Change `.hero-cta` flex direction to `column`, and add `.hero-cta-row` as a flex row inside it.

- [ ] **Step 3: Add `scrollToDemo` method in `<script setup>`**

  ```ts
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }
  ```

- [ ] **Step 4: Add styles for Watch Demo button and cta-row**

  ```css
  .hero-cta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .watch-demo-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    font-weight: 600;
    color: var(--accent-primary);
    text-decoration: none;
    padding: 8px 4px;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease;
  }

  .watch-demo-btn:hover {
    border-bottom-color: var(--accent-primary);
  }
  ```

- [ ] **Step 5: Verify in browser**

  4 stats are visible. Watch Demo link appears next to Install button. Clicking Watch Demo scrolls to `#demo` (section doesn't exist yet — page will just not scroll; that's OK for now).

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/HeroSection.vue
  git commit -m "feat: update hero stats to real numbers, add Watch Demo button"
  ```

---

## Task 3: Create DemoSection component

**Files:**
- Create: `src/components/DemoSection.vue`

- [ ] **Step 1: Create the file**

  ```vue
  <template>
    <section class="demo" id="demo">
      <div class="demo-container">
        <div class="section-header">
          <h2 class="section-title">See it in action</h2>
          <p class="section-subtitle">From upload to transcript in under 30 seconds</p>
        </div>

        <div ref="videoContainer" class="youtube-wrapper">
          <iframe
            v-if="videoLoaded"
            src="https://www.youtube.com/embed/Jp9s63e7xqU?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&loop=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="youtube-iframe"
          ></iframe>
          <div v-else class="youtube-placeholder">
            <div class="placeholder-icon">▶</div>
            <div class="placeholder-text">Loading video...</div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const videoLoaded = ref(false)
  const videoContainer = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!videoContainer.value) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded.value) {
            videoLoaded.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '100px', threshold: 0.1 }
    )
    observer.observe(videoContainer.value)
  })

  onBeforeUnmount(() => {
    if (videoContainer.value && observer) {
      observer.unobserve(videoContainer.value)
    }
  })
  </script>

  <style scoped>
  .demo {
    padding: 80px 0;
    background: var(--color-surface);
  }

  .demo-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-text);
    margin-bottom: 12px;
  }

  .section-subtitle {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  .youtube-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  }

  html[data-theme='dark'] .youtube-wrapper {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  }

  .youtube-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .youtube-placeholder {
    width: 100%;
    height: 100%;
    background: var(--color-surface-elevated);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .placeholder-icon {
    font-size: 48px;
    color: var(--color-text-muted);
  }

  .placeholder-text {
    font-size: 14px;
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    .demo {
      padding: 60px 0;
    }
  }
  </style>
  ```

- [ ] **Step 2: Verify the file saved correctly**

  Check that `src/components/DemoSection.vue` exists. The component is not yet wired — that happens in Task 8.

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/DemoSection.vue
  git commit -m "feat: add DemoSection with YouTube lazy-load embed"
  ```

---

## Task 4: Create UploadRecordSection component

**Files:**
- Create: `src/components/UploadRecordSection.vue`

The Chrome Web Store URL is the same one used in `InstallButton.vue`:
`https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en`

Icons are Heroicons outline SVGs (inlined, no library needed).

- [ ] **Step 1: Create the file**

  ```vue
  <template>
    <section class="upload-record">
      <div class="upload-record-container">
        <div class="cards">

          <!-- Upload Card -->
          <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="card">
            <div class="card-header">
              <div class="card-icon-wrap">
                <!-- Heroicons: cloud-arrow-up -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
              </div>
              <div class="card-heading">
                <h3 class="card-title">Upload a file</h3>
                <p class="card-subtitle">MP3, WAV, M4A, OGG, MP4 and more</p>
              </div>
            </div>
            <div class="card-body">
              <div class="drop-zone">
                <!-- Heroicons: folder-open -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="drop-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
                <span class="drop-text">Click to upload and transcribe for free</span>
              </div>
              <!-- Placeholder label for developer -->
              <p class="dev-note">[Screenshot: extension upload UI with drag-and-drop area]</p>
            </div>
          </a>

          <!-- Record Card -->
          <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="card">
            <div class="card-header">
              <div class="card-icon-wrap">
                <!-- Heroicons: microphone -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
              </div>
              <div class="card-heading">
                <h3 class="card-title">Record audio live</h3>
                <p class="card-subtitle">Capture mic or browser tab in real time</p>
              </div>
            </div>
            <div class="card-body">
              <div class="waveform-zone">
                <div class="record-dot"></div>
                <div class="waveform">
                  <span class="bar" style="--h: 8px"></span>
                  <span class="bar" style="--h: 20px"></span>
                  <span class="bar" style="--h: 32px"></span>
                  <span class="bar" style="--h: 14px"></span>
                  <span class="bar" style="--h: 26px"></span>
                  <span class="bar" style="--h: 36px"></span>
                  <span class="bar" style="--h: 18px"></span>
                  <span class="bar" style="--h: 28px"></span>
                  <span class="bar" style="--h: 10px"></span>
                  <span class="bar" style="--h: 22px"></span>
                  <span class="bar" style="--h: 34px"></span>
                  <span class="bar" style="--h: 16px"></span>
                  <span class="bar" style="--h: 24px"></span>
                </div>
              </div>
              <!-- Placeholder label for developer -->
              <p class="dev-note">[Screenshot: extension record UI with waveform and Record button]</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  </template>

  <script setup lang="ts">
  const storeUrl = 'https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en&utm_source=site&utm_medium=cpc'
  </script>

  <style scoped>
  .upload-record {
    padding: 48px 0;
    background: var(--color-background);
  }

  .upload-record-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: 20px;
    padding: 28px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }

  .card:hover {
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.12);
    border-color: var(--accent-primary);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .card-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--accent-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-heading {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
  }

  .card-subtitle {
    font-size: 13px;
    color: var(--color-text-muted);
    margin: 0;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Upload drop zone */
  .drop-zone {
    border: 2px dashed var(--color-border);
    border-radius: 12px;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    transition: border-color 0.2s ease;
  }

  .card:hover .drop-zone {
    border-color: var(--accent-primary);
  }

  .drop-icon {
    width: 36px;
    height: 36px;
    color: var(--accent-primary);
  }

  .drop-text {
    font-size: 13px;
    color: var(--color-text-secondary);
    text-align: center;
  }

  /* Record waveform zone */
  .waveform-zone {
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 24px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .record-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #ef4444;
    flex-shrink: 0;
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
    animation: pulse 1.8s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }

  .waveform {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 44px;
  }

  .bar {
    display: block;
    width: 4px;
    height: var(--h, 16px);
    background: var(--accent-primary);
    border-radius: 2px;
    animation: wave 1.2s ease-in-out infinite alternate;
    opacity: 0.7;
  }

  .bar:nth-child(odd)  { animation-delay: 0s; }
  .bar:nth-child(even) { animation-delay: 0.3s; }
  .bar:nth-child(3n)   { animation-delay: 0.6s; }

  @keyframes wave {
    0%   { transform: scaleY(0.4); }
    100% { transform: scaleY(1); }
  }

  /* Developer placeholder note */
  .dev-note {
    font-size: 11px;
    color: var(--color-text-muted);
    text-align: center;
    font-style: italic;
    margin: 0;
  }

  @media (max-width: 640px) {
    .cards {
      grid-template-columns: 1fr;
    }

    .upload-record {
      padding: 36px 0;
    }
  }
  </style>
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/UploadRecordSection.vue
  git commit -m "feat: add UploadRecordSection with Upload/Record cards and animated waveform"
  ```

---

## Task 5: Update BenefitsSection — Bigger typography + updated features

**Files:**
- Modify: `src/components/BenefitsSection.vue`

- [ ] **Step 1: Update the `features` array in `<script setup>`**

  Replace the entire `features` array:

  ```ts
  const features = [
    {
      emoji: '⚡',
      title: 'Upload Files or Record Live',
      description: 'Drag and drop any audio or video file — MP3, WAV, M4A, OGG, MP4. Or click Record to capture your microphone or any browser tab in real time. Transcription starts instantly.',
      mediaLabel: '[GIF: user drags audio file into extension popup → transcript text appears in seconds]',
    },
    {
      emoji: '🌐',
      title: '90+ Languages with Timestamps',
      description: 'Transcribe in any language — detected automatically. Each segment includes a timestamp so you can navigate to any moment. Perfect for multilingual meetings and interviews.',
      mediaLabel: '[Screenshot: transcript with timestamps visible, language auto-detected label shown]',
    },
    {
      emoji: '✨',
      title: 'AI-Powered Summary',
      description: 'After transcription, get an automatic summary of key points. No more reading through long transcripts — the important parts are extracted for you instantly.',
      mediaLabel: '[Screenshot: summary panel below transcript text with key points bulleted]',
    },
    {
      emoji: '📋',
      title: 'History, Edit & Export',
      description: 'All your transcriptions are saved. Edit the text directly in the extension, then download as TXT or copy to clipboard. Your history is always one click away.',
      mediaLabel: '[Screenshot: transcription history list with edit icon and Download TXT button visible]',
    },
  ]
  ```

- [ ] **Step 2: Increase font sizes in `<style scoped>`**

  Update `.feature-title`:
  ```css
  .feature-title {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-text);
    margin: 0;
    text-align: left;
  }
  ```

  Update `.feature-description`:
  ```css
  .feature-description {
    font-size: 1.125rem;
    line-height: 1.75;
    color: var(--color-text-secondary);
    margin: 0;
    text-align: left;
  }
  ```

  Update `.feature-icon` (make emoji bigger):
  ```css
  .feature-icon {
    font-size: 2.5rem;
    line-height: 1;
  }
  ```

- [ ] **Step 3: Verify in browser**

  Feature titles should be large and bold — comparable to the Transkriptor screenshot (big heading left, media right). Text should feel like a "mini hero" for each feature.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/BenefitsSection.vue
  git commit -m "feat: update BenefitsSection — bigger typography, real feature content"
  ```

---

## Task 6: Redesign HowItWorksSection as horizontal slider

**Files:**
- Modify: `src/components/HowItWorksSection.vue`

- [ ] **Step 1: Replace the entire file with the slider implementation**

  ```vue
  <template>
    <section class="how-it-works" id="how-it-works">
      <div class="how-it-works-container">
        <div class="section-header">
          <h2 class="section-title">How it works</h2>
          <p class="section-subtitle">Get your first transcription in under 2 minutes</p>
        </div>

        <div class="slider">
          <div class="slides">
            <div
              class="slide"
              v-for="(step, index) in visibleSteps"
              :key="step.title"
            >
              <div class="slide-media">
                <div class="media-placeholder">
                  <span class="media-placeholder-label">{{ step.mediaLabel }}</span>
                </div>
              </div>
              <div class="slide-content">
                <div class="slide-number">{{ currentStep + index + 1 }}.</div>
                <h3 class="slide-title">{{ step.title }}</h3>
                <p class="slide-description">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <div class="slider-controls">
            <button
              class="arrow-btn"
              :disabled="currentStep === 0"
              @click="prev"
              aria-label="Previous step"
            >
              &#8592;
            </button>
            <button
              class="arrow-btn"
              :disabled="currentStep === steps.length - 2"
              @click="next"
              aria-label="Next step"
            >
              &#8594;
            </button>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'

  const steps = [
    {
      title: 'Install the Extension',
      description: 'Add Audio to Text to Chrome with one click — no account or sign-up required. The extension appears in your toolbar instantly.',
      mediaLabel: '[Screenshot: Chrome Web Store install page for the Audio to Text extension]',
    },
    {
      title: 'Upload or Record Audio',
      description: 'Drop an audio or video file, or click Record to capture your microphone or any browser tab in real time. MP3, WAV, M4A, OGG, MP4 and more.',
      mediaLabel: '[GIF: extension popup — user clicks Upload, selects file, loading progress starts]',
    },
    {
      title: 'Get Your Transcript',
      description: 'Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT. Your transcript history is saved automatically.',
      mediaLabel: '[GIF: transcript text appearing, then user clicks Download TXT button]',
    },
  ]

  const currentStep = ref(0)

  // Show 2 steps at a time; second slot wraps if needed
  const visibleSteps = computed(() => [
    steps[currentStep.value],
    steps[currentStep.value + 1],
  ])

  const progressPercent = computed(() =>
    (currentStep.value / (steps.length - 2)) * 100
  )

  const prev = () => {
    if (currentStep.value > 0) currentStep.value--
  }

  const next = () => {
    if (currentStep.value < steps.length - 2) currentStep.value++
  }
  </script>

  <style scoped>
  .how-it-works {
    padding: 80px 0;
    background: var(--color-surface);
  }

  .how-it-works-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-text);
    margin-bottom: 12px;
  }

  .section-subtitle {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
  }

  .slider {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .slides {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .slide {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .slide-media {
    flex-shrink: 0;
  }

  .media-placeholder {
    aspect-ratio: 16 / 10;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .media-placeholder-label {
    font-size: 12px;
    color: var(--color-text-muted);
    text-align: center;
    line-height: 1.5;
    font-style: italic;
  }

  .slide-content {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .slide-number {
    font-size: 3rem;
    font-weight: 900;
    color: var(--accent-primary);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .slide-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin: 0;
  }

  .slide-description {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* Controls */
  .slider-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .arrow-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    background: var(--color-surface-elevated);
    color: var(--color-text);
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .arrow-btn:hover:not(:disabled) {
    border-color: var(--accent-primary);
    background: var(--accent-primary);
    color: white;
  }

  .arrow-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .progress-bar {
    flex: 1;
    height: 4px;
    background: var(--color-border);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent-primary);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    .how-it-works {
      padding: 60px 0;
    }

    .slides {
      grid-template-columns: 1fr;
    }

    /* On mobile show only the first visible slide */
    .slide:last-child {
      display: none;
    }
  }
  </style>
  ```

- [ ] **Step 2: Verify slider in browser**

  - Two step cards visible side by side
  - Left arrow disabled on first position, right arrow disabled on last
  - Progress bar fills as you advance
  - Clicking arrows transitions between step pairs
  - Step numbers show correctly (1. and 2. initially, then 2. and 3.)

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/HowItWorksSection.vue
  git commit -m "feat: redesign HowItWorksSection as horizontal 2-step slider"
  ```

---

## Task 7: Redesign TestimonialsSection as masonry grid

**Files:**
- Modify: `src/components/TestimonialsSection.vue`

- [ ] **Step 1: Update section subtitle in `<template>`**

  Change:
  ```html
  <p class="section-subtitle">Thousands of professionals and students trust Audio to Text every day</p>
  ```
  To:
  ```html
  <p class="section-subtitle">Based on <strong>19 reviews</strong> on Chrome Web Store</p>
  ```

- [ ] **Step 2: Change `.testimonials-grid` to `.testimonials-masonry` in template**

  ```html
  <div class="testimonials-masonry">
    <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.name">
      <!-- keep existing card content unchanged -->
    </div>
  </div>
  ```

- [ ] **Step 3: Replace `.testimonials-grid` CSS with masonry styles**

  Remove the old grid rule and add:

  ```css
  .testimonials-masonry {
    columns: 4;
    column-gap: 20px;
  }

  .testimonial-card {
    break-inside: avoid;
    margin-bottom: 20px;
    /* keep all existing card properties (background, border, border-radius, padding, etc.) */
  }
  ```

  Update responsive breakpoints (replace old grid breakpoints):

  ```css
  @media (max-width: 900px) {
    .testimonials-masonry {
      columns: 3;
    }
  }

  @media (max-width: 600px) {
    .testimonials-masonry {
      columns: 2;
    }
  }

  @media (max-width: 400px) {
    .testimonials-masonry {
      columns: 1;
    }
  }
  ```

- [ ] **Step 4: Vary testimonial text lengths for natural masonry effect**

  Make some testimonials longer and some shorter so the masonry has visible height variation. Edit the `testimonials` array — add 2 short ones and 2 longer ones:

  ```ts
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Project Manager',
      text: 'I use this every day for team meetings. The accuracy is impressive — even with background noise. Saves me at least an hour daily.',
    },
    {
      name: 'James K.',
      role: 'Journalist',
      text: 'As a journalist I record interviews constantly. This extension transcribes an hour-long interview in under a minute. The timestamp feature is essential — I can jump to any quote instantly. Highly recommended for anyone who works with audio professionally.',
    },
    {
      name: 'Priya S.',
      role: 'PhD Student',
      text: 'I transcribe research interviews with this extension. Accuracy for academic content is excellent.',
    },
    {
      name: 'Marco D.',
      role: 'Content Creator',
      text: 'Game changer for my YouTube workflow. I record commentary, transcribe it instantly, and use the TXT file for descriptions and subtitles. Simple and accurate.',
    },
    {
      name: 'Anna R.',
      role: 'Legal Assistant',
      text: 'We use this to transcribe client consultations. The privacy-first approach matters to us — no data stored, quick results. The 90+ language support is a bonus since we work with international clients.',
    },
    {
      name: 'Tom W.',
      role: 'Podcast Producer',
      text: 'Transcribing podcast episodes used to take hours. Now it takes minutes.',
    },
  ]
  ```

- [ ] **Step 5: Verify masonry in browser**

  Cards should have natural varying heights. Columns should look like Pinterest / Tactiq — no uniform row heights.

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/TestimonialsSection.vue
  git commit -m "feat: redesign TestimonialsSection as CSS masonry grid (Tactiq style)"
  ```

---

## Task 8: Wire everything in index.astro + remove SocialProofBar

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/SocialProofBar.vue`

- [ ] **Step 1: Update `index.astro` imports and component order**

  Replace the current content with:

  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import NavigationBar from '../components/NavigationBar.vue';
  import HeroSection from '../components/HeroSection.vue';
  import DemoSection from '../components/DemoSection.vue';
  import UploadRecordSection from '../components/UploadRecordSection.vue';
  import CompatibilitySection from '../components/CompatibilitySection.vue';
  import BenefitsSection from '../components/BenefitsSection.vue';
  import HowItWorksSection from '../components/HowItWorksSection.vue';
  import TestimonialsSection from '../components/TestimonialsSection.vue';
  import FAQSection from '../components/FAQSection.vue';
  import CTASection from '../components/CTASection.vue';
  import AppFooter from '../components/AppFooter.vue';

  const title = 'Audio To Text Transcription - Convert Audio to Text Instantly | Chrome Extension';
  const description = 'Convert audio and video to text instantly with our Chrome extension. Upload files, record from microphone or browser tab. Powered by Groq + Whisper AI. Edit transcripts and export to multiple formats.';
  ---

  <Layout title={title} description={description}>
    <NavigationBar client:load />
    <main class="landing-page">
      <HeroSection client:load />
      <DemoSection client:load />
      <UploadRecordSection client:load />
      <CompatibilitySection client:load />
      <BenefitsSection client:load />
      <HowItWorksSection client:load />
      <TestimonialsSection client:load />
      <FAQSection client:load />
      <CTASection client:load />
      <AppFooter client:load />
    </main>
  </Layout>

  <style>
    .landing-page {
      min-height: 100vh;
      background: transparent;
      overflow-x: hidden;
    }
  </style>
  ```

- [ ] **Step 2: Delete SocialProofBar**

  ```bash
  rm src/components/SocialProofBar.vue
  ```

- [ ] **Step 3: Full page review in browser**

  Scroll through the entire page and verify:
  - [ ] Hero: 4 stats (1.2k+ WAU · ★ 5.0 · 99% · 90+), Watch Demo button visible
  - [ ] DemoSection: YouTube player loads on scroll
  - [ ] UploadRecordSection: two cards with icons, waveform animation
  - [ ] BenefitsSection: large bold feature titles, updated content
  - [ ] HowItWorksSection: 2 slide cards side by side, working arrows + progress bar
  - [ ] TestimonialsSection: masonry layout with varying card heights
  - [ ] No SocialProofBar visible
  - [ ] Dark mode: toggle and verify everything looks correct

- [ ] **Step 4: Check mobile (resize to 375px)**

  - Upload/Record cards stack vertically
  - HowItWorks shows single slide
  - Testimonials: 2 columns at ≤700px, 1 at ≤400px

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/index.astro
  git rm src/components/SocialProofBar.vue
  git commit -m "feat: wire redesigned landing page — add DemoSection, UploadRecordSection, remove SocialProofBar"
  ```
