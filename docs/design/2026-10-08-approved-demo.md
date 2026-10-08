# Approved demo design — 2026-10-08

Branch: `codex/web-transcription-preview`. No merge or deployment.

The demo remains secondary to installing the Chrome extension. It accepts one file and uses the existing public preview API.

## Approved interaction

- The upload surface and selected file share the same fixed dimensions: 164 px on desktop and 184 px on mobile, with 16 px padding in both states.
- Choosing a file slides the upload instructions left and brings the file view from the right. Removing reverses this transition. No visible stepper.
- The inactive pane is inert and hidden from assistive technology. Dropping another file while one is selected does not replace it.
- The selected file is centered, with a document icon and a badge populated from its extension, filename, file size, and audio duration. Long names are ellipsized with the full name available on hover.
- A close icon in the top-right removes the file. Removal remains blocked while uploading/transcribing.
- The centered Transcribe button is 200 px wide. Reading metadata and processing use one spinner; upload alone shows measurable percentage progress.
- Service errors appear inside the file view with Try again, rather than in a large red alert panel. File validation errors appear beneath the uploader.
- The transcript has its own scroll area capped at 300 px on desktop and 260 px on mobile. Copy text remains outside the scroll area and copies the full result. No download action.
- The existing extension CTA and copy notification are retained. Removing a file clears its transcript and notification.
- Theme tokens match the surrounding landing sections. Reduced motion disables sliding and spinner animation.

## Verification

- Astro production build passed.
- Existing 27 Node tests passed.
- Browser scenario used mocked config and transcription responses, without paid transcription requests: upload/progress, processing with a single indicator, failure/retry/success, constant uploader height, full-text clipboard copying and notification, safe literal rendering of HTML-like transcript text, internal scrolling, removal/reset, upper-case extensions and long filenames, mobile overflow checks, reduced-motion behavior.

Interactive mockups remain in the ignored `.superpowers/brainstorm/25090-1791472901/content/` directory. This iteration changes the UI, not the backend or its limits.
