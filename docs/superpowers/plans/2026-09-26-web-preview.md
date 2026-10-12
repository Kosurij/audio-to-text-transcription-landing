# Web transcription preview implementation plan

> Execute inline with executing-plans; final independent review after integration.

Goal: a usable first-minute transcript on the landing, with a separate bounded API.
Architecture: Vue form → Express /web endpoints → persistent PostgreSQL quotas → bounded ffmpeg PCM → one Groq request. Existing extension routes remain unchanged.
Spec: docs/research/2026-09-26-web-preview-api-contract.md

## Constraints
25 MiB upload; 60 seconds recognized; 3 IP attempts per UTC day; 100 provider calls per UTC day; no provider retries/fallback; no transcript persistence; disabled by default until configured. Two repositories use codex/web-transcription-preview. Backend worktree: /tmp/audio-web-preview-backend.

## Task 1 — bounded audio and accounting
- [ ] Write tests for 30/60/180-second files, malformed/no-audio inputs, aborts, and quota exhaustion. Run red.
- [ ] Implement backend/src/webPreview/{config,audio,quota}.ts. Audio returns {wav, processedSeconds, hasMoreAudio}; quota exposes check/reserve with atomic PostgreSQL counters, UTC reset, HMAC IP identity.
- [ ] Run ffmpeg integration tests, quota tests and typecheck.

## Task 2 — API integration
- [ ] Write route tests covering disabled/busy/foreign origin, malformed upload, quota rejection, success and upstream failure without retry.
- [ ] Implement backend/src/webPreview/{router,provider}.ts; mount before broad CORS/logging so this route has its own sanitized logging and origin policy. Reuse shared ffmpeg semaphore. Add abort/timeout/cleanup, additive database initialization, env and AGENTS documentation.
- [ ] Run endpoint tests and backend suite. Verify no changes to extension accounting and fallback.

## Task 3 — landing form
- [ ] Write tests for file selection validation, state transitions, retry behavior and saving the actual result. Use Node tests with Vue composable and injected transport, no new test dependencies.
- [ ] Replace UploadRecordSection with file-only form; add composable for config/XHR/result. Include progress, accessible statuses, copy/TXT, continuation CTA, mobile copy, service-disabled fallback. Preserve previous result after errors.
- [ ] Build and test; browser-check desktop/mobile and keyboard using local mock provider, clearly distinguish fixture from real API.

## Task 4 — integration and review
- [ ] Run full backend and landing tests, typecheck, real ffmpeg format matrix. Do not send paid requests or user files to providers during tests.
- [ ] Independent review of both diffs, fix material findings and regression-test them.
- [ ] Document configuration and deployment sequence; commit feature in both branches. No push, merge or deployment.

## Review focus
- Media headers lie or omit duration: bound decoded samples, never send original.
- Browser abort / provider timeout: no second call, no orphan processes/files.
- Concurrent quota requests / midnight / restart: persistent atomic limits.
- Shared IP and mobile browser: explain limitations and preserve useful result.
- Text contains markup or sensitive filenames: render plain text; no content analytics/logging.

## Progress
Plan prepared; user explicitly authorized implementation and separate branches. Existing landing work is carried onto its branch without reverting it. Backend original output/ left untouched.

Checkpoint at user-requested pause: first-pass backend and form implemented; 642 backend tests and 23 landing tests passed before last documentation/privacy refinements. Real audio clipping covered. Final format matrix, DB concurrency integration, browser validation and independent review remain. See docs/research/2026-09-26-web-preview-checkpoint.md for exact resume state.
