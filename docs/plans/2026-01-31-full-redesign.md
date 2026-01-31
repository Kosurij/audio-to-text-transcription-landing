# Full Landing Page Redesign

## Positioning

AI-powered audio assistant, not just a converter. Focus on the conversation, AI handles the rest.

## Color System

### Light Theme
- Background primary: `#FAF8F5` (warm cream)
- Background alt: `#FFFFFF` (white, alternating sections)
- Surface: `#FFFFFF`
- Text primary: `#1E1B18`
- Text secondary: `#5C534D`
- Text muted: `#8A7F76`
- Accent: `#7C5CFC` (vibrant violet)
- Accent hover: `#6B4AEB`
- Accent light: `#F3F0FF` (violet tint for icon backgrounds)
- Accent light border: `#E4DEFF`
- Button primary bg: `#7C5CFC`
- Button primary text: `#FFFFFF`
- Button secondary bg: `#1E1B18`
- Button secondary text: `#FFFFFF`
- Border: `#E8E3DB`
- Border light: `#F0EBE3`

### Dark Theme
- Background: `#1A1614`
- Surface: `#2C2420`
- Surface elevated: `#352D28`
- Text primary: `#F5F1EB`
- Text secondary: `#AFA49A`
- Accent: `#9B85FD` (lighter violet)
- Accent light: `rgba(124, 92, 252, 0.12)`
- Button primary bg: `#9B85FD`
- Button primary text: `#1A1614`
- Border: `#3D342E`

### Shadows (warm)
- sm: `0 1px 3px 0 rgba(30, 27, 24, 0.06), 0 1px 2px 0 rgba(30, 27, 24, 0.04)`
- md: `0 4px 6px -1px rgba(30, 27, 24, 0.08), 0 2px 4px -1px rgba(30, 27, 24, 0.04)`
- lg: `0 10px 15px -3px rgba(30, 27, 24, 0.08), 0 4px 6px -2px rgba(30, 27, 24, 0.04)`
- xl: `0 20px 25px -5px rgba(30, 27, 24, 0.1), 0 10px 10px -5px rgba(30, 27, 24, 0.04)`

### Typography
- Headings: `'Outfit', sans-serif` — weights 500, 600, 700
- Body: `'Inter', sans-serif` — weights 400, 500, 600
- H1: `clamp(2.75rem, 5.5vw, 4.25rem)`
- H2: `clamp(2rem, 4vw, 3rem)`
- H3: `clamp(1.25rem, 2.5vw, 1.5rem)`

### Radii
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- full: 9999px

---

## Page Structure

### 1. Navbar
- Fixed top, blur on scroll
- Left: SVG logo (violet audio wave icon) + "Audio To Text"
- Center: Features | How it Works | FAQ (anchor links)
- Right: theme toggle + **"Add to Chrome — It's Free"** violet button
- Mobile: burger menu, CTA stays visible

### 2. Hero Section
- Layout: two columns on desktop (text left 55%, mockup right 45%), stacked on mobile
- **Headline:** "Focus on the Conversation. AI Handles the Rest."
- **Subtitle:** "Real-time transcription, smart summaries, and instant insights from any audio — meetings, lectures, podcasts, and more."
- **CTA buttons:** "Add to Chrome — It's Free" (violet) + "See How It Works" (outline, scrolls to demo video)
- **Platform badges:** row of small icons — Chrome, Google Meet, Zoom, MS Teams + text "Works with your favorite tools"
- **Right side: CSS mockup of extension UI**
  - Styled as a browser extension popup window
  - Header bar with extension name + controls
  - Simulated waveform visualization (CSS bars)
  - Fake transcript text lines (2-3 lines with typing animation)
  - "Summary" badge at bottom
  - Warm shadow, rounded corners (xl)
- Background: warm cream + subtle violet radial gradient at top

### 3. Social Proof Bar
- Full width, slightly different background (white or cream)
- Three stats in a row, centered:
  - **"1,000+"** Active Users
  - **"4.9 ★"** Chrome Web Store
  - **"95%+"** Transcription Accuracy
- Below stats: "Trusted by students, professionals, and teams worldwide"
- Numbers: large Outfit 700, violet color
- Labels: small Inter 400, text-secondary

### 4. Feature Card 1: Real-Time Transcription
- Full width section, cream background
- Layout: text left, mockup right
- **Title:** "Real-Time Transcription Without the Bot"
- **Description:** "Transcribe meetings, lectures, and calls as they happen. No awkward bot joining your call — just accurate text flowing in real-time."
- **Checkmarks** (violet checkmark icons):
  - Browser tab capture
  - Microphone recording
  - No bot in your meetings
- **Right mockup:** CSS styled extension window showing live transcription
  - Header with "Recording..." indicator (pulsing red dot)
  - Waveform bars animating
  - Text lines appearing with subtle fade-in
  - Timer showing "02:34"

### 5. Feature Card 2: AI Summaries & Key Insights
- Layout: mockup left, text right (alternating)
- **Title:** "AI Summaries & Key Insights"
- **Description:** "Don't read the whole transcript. Get concise summaries, action items, and key takeaways in one click."
- **Checkmarks:**
  - One-click summaries
  - Key points extraction
  - Action items (coming soon)
- **Left mockup:** CSS styled summary card
  - "Summary" header with sparkle icon
  - 3-4 bullet point lines
  - "Key Topics" tag pills
  - Violet accent elements

### 6. Feature Card 3: Works With Any Audio
- Layout: text left, mockup right
- **Title:** "Works With Any Audio"
- **Description:** "Upload recordings in any format, transcribe browser tabs, or capture your microphone. Even large files — handled with ease."
- **Checkmarks:**
  - 10+ audio formats (MP3, WAV, FLAC, OGG...)
  - Large file support
  - Export to TXT, DOCX, SRT
- **Right mockup:** CSS styled upload zone
  - Dashed border drop zone
  - File format icons/pills (MP3, WAV, FLAC, etc.)
  - Upload progress bar
  - "Transcription complete" state with export buttons

### 7. Feature Card 4: Privacy & Security
- Layout: mockup left, text right
- **Title:** "Your Data Stays Yours"
- **Description:** "We don't store your recordings. We don't sell your data. Your conversations remain private — period."
- **Checkmarks:**
  - No data collection
  - Transparent privacy policy
  - You own your transcripts
- **Left mockup:** CSS/SVG shield illustration
  - Shield shape with lock icon
  - Checkmark badges around it
  - Violet gradient subtle glow

### 8. Demo Video Section
- White background
- Centered layout
- **Title:** "See It in Action"
- **Subtitle:** "2 minutes to understand everything"
- YouTube embed in a styled container (rounded corners, shadow)
- Max width 900px

### 9. How It Works
- Cream background
- **Title:** "How It Works"
- 3 steps horizontal (stacked on mobile)
- Each step: large violet number circle + title + short description
- Step 1: "Install" — "One click from Chrome Web Store. No signup needed."
- Step 2: "Record or Upload" — "Capture browser tab, microphone, or drop an audio file."
- Step 3: "Get Results" — "Read, edit, summarize, and export your transcript."

### 10. FAQ Section
- White background
- **Title:** "Frequently Asked Questions"
- Accordion items with violet accent on active
- Questions:
  1. What is Audio To Text Transcription?
  2. What recording modes are available?
  3. Which transcription engine powers it?
  4. What audio and video formats are supported?
  5. Can I edit transcripts inside the extension?
  6. How accurate are the results?
  7. Is my data private and secure?
  8. Does it support multiple languages?

### 11. CTA Section
- Cream background with subtle violet radial gradient
- **Title:** "Ready to Never Take Notes Again?"
- **Subtitle:** "Join thousands who already let AI handle their transcriptions."
- **CTA:** "Add to Chrome — It's Free" (violet button, large)
- Below: "Free forever. No credit card required."

### 12. Footer (multi-column, growth-ready)
- Background: slightly darker cream (`#F0EBE3`) or dark in dark theme
- 4 columns:
  - **Product:** Features, How It Works, Chrome Extension (link to store)
  - **Use Cases:** Meeting Notes, Lecture Transcription, Podcast Transcription, Interview Notes (all plain text, no links)
  - **Resources:** Demo Video (anchor), FAQ (anchor), Privacy Policy (link)
  - **Connect:** Twitter/X (plain text), GitHub (plain text), Contact (plain text)
- Bottom bar: copyright + "Made with AI in mind"
- Logo in footer top-left above columns

---

## CSS Mockup Specifications

All mockups are pure CSS+HTML (no images). They serve as placeholders that already look polished. The user will replace them with real screenshots later.

### Mockup Base Style
```css
.mockup-window {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.mockup-titlebar {
  height: 40px;
  background: var(--color-paper-secondary);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.mockup-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
}
```

### Mockup Content Patterns
- **Text lines:** Gray rounded rectangles of varying widths (60%-90%)
- **Waveform:** 15-20 thin vertical bars of varying heights, violet color
- **Buttons:** Small rounded rectangles with text
- **Tags/pills:** Small rounded badges with format names
- **Progress bar:** Thin rounded rectangle, partially filled with violet

---

## Implementation Notes

### Files to Create/Modify
- `Layout.astro` — update CSS variables to violet palette
- `Logo.vue` — violet gradient SVG
- `NavigationBar.vue` — add CTA button, restructure
- `HeroSection.vue` — full rewrite: two-column layout + mockup
- `SocialProofBar.vue` — new component
- `FeatureCard.vue` — new component (reusable, alternating layout)
- `MockupWindow.vue` — new component (reusable mockup frame)
- `MockupTranscription.vue` — live transcription mockup
- `MockupSummary.vue` — summary mockup
- `MockupUpload.vue` — upload zone mockup
- `MockupPrivacy.vue` — shield/privacy mockup
- `DemoVideoSection.vue` — renamed/rewritten from HowItWorksSection
- `HowItWorks.vue` — simplified 3 steps
- `FAQSection.vue` — restyled
- `CTASection.vue` — rewritten
- `AppFooter.vue` — full rewrite, multi-column
- `InstallButton.vue` — violet style
- `index.astro` — new section order and components

### What Gets Removed
- `BenefitsSection.vue` — replaced by FeatureCards
- Old HowItWorksSection video+steps combo — split into separate sections
- All peach/coral color references
- Background video (already removed)

### Chrome Web Store URL
`https://chromewebstore.google.com/detail/audio-to-text-transcripti/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en`
