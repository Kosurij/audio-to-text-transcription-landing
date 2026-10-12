# Demo update — 2026-09-29

User-approved: 100 MiB per file, 60 minutes per IP per UTC day. Full recording or explicit quota error; no first-minute preview, no three-attempt cap. No change to the primary extension installation CTA.

Upload styling follows the extension UploadTab.vue: whole empty area clickable with pointer, blue title, hover border/background/shadow, format badges and 100 MB badge. Separate Choose file button removed. Enter/Space work; selected filename, adjacent remove cross, duration, Transcribe button and panel height animation retained.

Backend worktree: /tmp/audio-web-preview-backend. IP quota now reserves actual rounded-up audio seconds atomically after decoding, refunds on failure, and isolates counters from old attempt-based usage. MP3 at 48 kbps stays below the provider upload ceiling even for a full hour; PCM byte-counting measures decoded duration without retaining raw audio. Global provider budget remains 100 minutes/day (previously approved), with 10-second minimum per call and no refund for possibly billable errors.

Local API 127.0.0.1:4330 uses an isolated persistent PGlite database and existing Groq credentials. Landing 127.0.0.1:4323 points at it. No deploy or push. Existing production limits are unchanged until release.

Verification: real SQL integration covers concurrent reservations, old-counter isolation, persistence, UTC rollover and refunds. Audio tests cover all 14 input formats, full-hour compression and rejection instead of clipping. Browser checks cover pointer, whole-area click, keyboard selection, duration and mobile overflow. A short synthetic recording is used for the real provider check.

Provider reference: https://console.groq.com/docs/speech-to-text (25 MB attachment ceiling).

Final verification: landing build + 25 tests passed; backend type-check and all 661 tests passed. Full backend HTTP tests needed an unsandboxed local-port run (initial sandbox run failed with listen EPERM). Real synthetic 6.639-second transcription returned HTTP 200 and 3,593 seconds remaining. Local API restarted with new settings.

Follow-up: upload/transcription progress now replaces the Transcribe button and size badge inside the upload area. Upload has actual percent; processing uses an indeterminate animation because the API has no live progress endpoint. Reduced-motion disables movement. Removed both visible result headings; retained an accessible region label. Post-result CTA is a blue/purple Add to Chrome button with recording/history/summary benefits, without an arrow or unsupported generic claims about fewer limits.

Course reference checked: local lesson 12 notes, “Удержание после первой пользы”, 00:36:20–00:43:15: offer the extension after the user receives value. CTA wording/gradient is our adaptation. Landing build and 25 tests pass; controlled browser XHR checked processing/result transitions, mobile layout and reduced-motion. No additional paid API call.

Result-action follow-up: size badge now disappears on file selection. Transcribe disappears after success for that file and returns for a newly selected file. The installation CTA uses the actual PlanPicker gradient/shimmer with no hover translation. Copy confirms via a timed visible, live-region notification and Copied! button state. Copy/download have icons and hover/active feedback. Browser test checks clipboard contents, notification, new-file lifecycle, hover styling, stationary CTA, shimmer and reduced motion. Build + 25 tests passed.
