# Landing and public demo — checkpoint, 8 October 2026

## Purpose and constraints

Improve organic visibility and installation conversion. Primary target is installation of the Chrome extension; Demo is an optional useful tool, linked in navigation. All work is on `codex/web-transcription-preview` in both repositories; never merge to main/master without the user's instruction.

Before product/content/monetization decisions, consult the relevant local B1 course lesson and distinguish the author's recommendation from our adaptation. Sources: `/Users/yuri/Documents/Notes/Личное/B1 Site Builders/`. Lesson 03 at 00:20:12 explains WebToPDF: useful result followed by concrete extension benefits. Lesson 13 at 00:05:08 describes free website transcription and purchases through its companion extension. Our limit and cleanup settings are engineering choices, not prescriptions from the course.

## Approved UI

One-file uploader and centered file card replace one another horizontally; both have the same height. No visible stepper. Document icon contains the file extension; remove X at top right; Transcribe centered beneath file details. Removal/selection blocked during processing. Upload has real percentage; transcription has one spinner. Results use an internal scroll area, Copy only, and a copied notification. No downloading in website demo.

After success: “Do more with your transcript”, Add to Chrome, and these bullets in order:

- Edit your transcript
- Transcribe in the background and get an email when it’s ready
- Download your transcript as a file
- Get an AI summary of your recording
- See your past transcripts
- Get automatic timestamps

IP quota refusal is a separate state: “Keep transcribing in Chrome” / “You’ve reached the free demo limit. Continue in the Chrome extension.” / “Add to Chrome”. Do not expose renewal/tomorrow messaging for this state. Shared capacity and technical errors remain separate. No promise of unlimited free extension use or automatic transfer of the current transcript.

Public-copy clarification, 8 October: do not describe the 24-hour quota window or reset schedule in FAQ or other public demo copy. The demo is a limited trial; the extension remains the product and primary CTA. FAQ and Privacy now describe copying the demo result, with editing/download/history in the extension, without the obsolete midnight-reset promise. The backend quota details below are internal implementation notes.

## Backend

Separate worktree: `/private/tmp/audio-web-preview-backend`; main checkout `/Users/yuri/projects/audio-to-text-transcription` stays unchanged. The worktree's missing files/Git link were restored from its saved branch before this change.

`GET /web/preview-config`, `POST /web/transcribe-preview`. File maximum 100 MiB; per-IP allowance 3600 audio seconds in a rolling 24-hour window starting at first reservation. PostgreSQL `web_preview_ip_usage` stores HMAC IP key, period/expiry, usage, reserved seconds and a 10-minute processing lease. Conditional UPSERT prevents concurrent overspending. Success releases the reservation, failure refunds usage; expiry cleanup protects live reservations. Old current-day usage migrates without resetting quota. Timestamp precision is normalized to milliseconds so completion/refund tokens match.

Existing provider budget remains 6000 seconds per UTC calendar day, conservatively charged on attempted provider calls. It can exhaust before every visitor uses their IP quota. This is a separate budget setting; no change to it was authorized in this step.

Existing cron container runs `scripts/cleanup-preview-quota.js` hourly. Startup also cleans expired quota; renewal does not depend on cron. File cleanup remains every five minutes. `proxy-addr` updated to 2.0.8 to patch the discovered IP-spoofing advisory.

## Verification

681 backend tests passed, including eight real PostgreSQL tests in a unique schema of a disposable Docker database: boundary, concurrency, failure refund, stale tokens, active/crashed cleanup, provider UTC budget, migrated completion/refund and actual cron script. TypeScript passed. Production dependency audit: zero vulnerabilities. Development-tool audit still reports findings; no claim that all tooling dependencies are clean.

Landing build and 29 tests passed. Mocked-browser checks confirmed quota-specific CTA, no reset-time suffix, unrelated error separation, and desktop/mobile rendering without horizontal overflow. No paid provider calls or production database mutations. Independent Superpowers code review's timestamp finding was reproduced by a failing test, fixed and rechecked; no remaining important findings.

## Continuation

Code is saved in the two separate branches. Deployment has not been performed: backend and cron container must both be rebuilt/restarted, and the landing branch deployed. Existing running local backend does not automatically become the new implementation. Review actual staging configuration, proxy trust and container/media-decoder isolation before release (see earlier security review).

Other work can move to a new chat using this file: measurement of demo→installation→first extension transcription→payment; GSC-led optimization of queries already bringing impressions; Semrush validation and useful article/comparison/how-to topics. Preserve human writing and real examples. Avoid mixing SEO/content tasks into the quota implementation.
