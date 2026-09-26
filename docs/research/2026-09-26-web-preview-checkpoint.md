# Checkpoint: first-minute web transcription

Paused at the owner's request on 2026-09-26. This is an implementation checkpoint, not a release. Nothing pushed, merged, deployed or enabled in production.

## Branches and locations

- Landing: `/Users/yuri/projects/audio-to-text-transcription-landing`, branch `codex/web-transcription-preview`.
- Backend: `/tmp/audio-web-preview-backend`, branch `codex/web-transcription-preview` in the original `/Users/yuri/projects/audio-to-text-transcription` repository. The branch and commits are stored in the original repository; the working directory is a linked worktree. Original main checkout was not edited; its pre-existing untracked `output/` remains untouched.

## Agreed behavior

One file upload, no Record. First 60 seconds shown and available to copy/download. No paid transcription of the blurred continuation. Limits: 25 MiB upload, 3 attempts per IP per UTC day, 100 provider calls/day (at most 100 minutes). New endpoint isolated from extension billing; disabled until explicitly enabled/configured for deployment.

## Implemented first pass

Backend `backend/src/webPreview/`: config, router, bounded ffmpeg extraction (61 seconds decoded to detect continuation, only 60 sent), one Groq request without retry/fallback, PostgreSQL atomic counter SQL, HMAC IP keys, multipart admission/limits, cleanup and sanitized logs. Mounted in `src/index.ts`; env, README and AGENTS documented.

Landing: `UploadRecordSection.vue` replaced with real upload form and service-availability fallback; `src/lib/transcriptionPreview.mjs` manages config, upload progress, errors and results. Copy/TXT, continuation CTA, mobile-compatible copy, keyboard controls, Metrica goal names, masked session replay area. Privacy description added. Existing OG, format count and accessibility edits are included in the landing checkpoint.

## Verification completed

- Real ffmpeg tests for 30/60/180 seconds, corrupt input and aborted request: passed.
- New backend audio/quota/router suite: 16 passed. Route tests use a stub transcriber and do not spend provider credits.
- Full backend suite after API mount: 642 passed across 44 files; TypeScript check passed. Network tests need local server permission (sandbox otherwise rejects listen()).
- Landing build and all 23 tests passed after initial form implementation. Later privacy text, session replay masking, noscript and analytics-isolation changes still need the final full run.
- No real provider request or production database access was performed.

## Resume here

1. Inspect both branches and this checkpoint before edits. Read the API contract and plan.
2. Run the real media-format matrix for all 14 claimed extensions, including MPEG files that may contain MP3 audio; revisit forced demuxer selection if needed. Test video without audio, deceptive duration, boundary-length clips and mid-flight abort/cleanup.
3. Exercise PostgreSQL quota SQL against a local engine with concurrent reservations/restart/midnight scenarios. `@electric-sql/pglite` was installed only under `/tmp/web-preview-db-test` for this; it has not been used yet and is not a production dependency.
4. Review upload cancellation/partial-file cleanup, deadline behavior and the separate web mount (it intentionally avoids generic content logs/CORS; it currently owns its own 10/min rate limit).
5. Browser-test enabled form and success/error/short/long-file paths at desktop/mobile widths using a clearly labeled local fixture server. No browser verification of the new form has happened yet. Current default API points at production, where the new endpoint has not been deployed; fallback is expected.
6. Independent full-diff review (required by executing-plans), regression fixes, final backend+landing suites and typechecks.
7. Reconcile the initial contract with the implementation (calendar UTC quotas; conservative whole-minute provider slots; single-process concurrency), finish deployment instructions and only then discuss activation.

Temporary backend node_modules was copied from the existing backend to allow Vite cache writes inside the worktree. It is ignored. No new runtime dependency was added. The generated image remains `public/og-image.png`.

## User communication at pause

Do not claim the live tool is ready or deployed. Saved code is a working first pass with automated checks, still awaiting the format/DB/browser/review steps above. The next session should continue implementation verification, not reopen product decisions or repeat reference research.
