# Online demo guide

## Scope

Add a static English guide immediately after the web demo on the homepage. The existing extension guide stays separate. This follows the distinction observed on WebToPDF: the homepage explains the online converter directly below its demo, while extension instructions cover a different flow.

B1 lesson 3 recommends clear screenshots and enough interface context to locate each action. These generated illustrations explain the existing interface; they do not represent a measured transcription result. At the user's request, redundant visible captions below both images were removed; image alt text still describes each illustration.

Steps: **Choose a file → Click Transcribe → Copy your text**. The file-size limit shown is the current 100 MB demo limit. No language selector, daily reset schedule, editing or download controls are added to the demo. The user explicitly deferred language settings.

All user-facing text is English. Annotation labels, dotted arrows and highlights use the product's indigo-violet accent, `#6366f1`, following the user's palette correction. The guide ends after step 3; the redundant limited-trial note was removed following user feedback. Extension capabilities are covered in the following page sections.

## Assets and implementation

- `public/demo-guide/choose-and-transcribe.png`: empty upload zone and selected-file state, with annotated upload zone and Transcribe button.
- `public/demo-guide/copy-transcript.png`: success state, sample transcript and annotated Copy text button.
- `src/components/DemoGuideSection.astro`: semantic English instructions, descriptive image alt text, lazy-loaded images and responsive layout.
- `src/pages/index.astro`: guide placed immediately after UploadRecordSection.

Generated using the built-in Imagegen tool. Reference: the current local demo's light-theme screenshot, observed in the in-app browser. Final images are illustrations based on the current UI, not unmodified screenshots. Original generated files remain in the tool output directory; consumed copies live in the repository.

## Prompt set

1. Create a white, flat screenshot-led tutorial of the existing web upload widget. Show a dashed upload zone with the exact labels `Drop your audio or video here`, `or click to choose a file`, `Max 100 MB`; below it show the selected file, `1.2 MB · 0:30 min`, and the blue `Transcribe` button. Add external labels `1. Choose a file` and `2. Click Transcribe` with dotted arrows and a highlight. Exclude browser chrome, extension UI and invented settings.
2. Create a companion success-state tutorial with the same selected file, green `Transcript ready`, a `Copy text` button and a sample transcript: `Today we are reviewing the project timeline. The first draft will be ready on Friday. Please send your feedback before the next meeting.` Annotate only the copy action with `3. Copy your text`. Exclude download, editing and timestamp controls.
3. Palette correction applied separately to both illustrations: replace all red annotation text, dotted arrows, arrowheads and highlight outlines with `#6366f1`, preserving English text, controls, geometry and background.

4. User correction applied to both illustrations: replace `sample-audio.mp3` with `Team Meeting.mp3`, keeping UI and annotations unchanged.
5. User correction to the result illustration: replace the short sample text with the work-meeting excerpt below. Expand the transcript card into the available bottom margin; keep the selected-file panel, Copy text action, annotation and canvas proportions.

Final sample transcript:

> Thanks, everyone. The upload flow is ready. Before launch, we need to check the mobile layout and update the help section.
>
> Alex will finish the interface fixes by Thursday. Maya will review the copy and test two recordings. Please add any issues to the shared checklist.
>
> We'll keep this release focused on uploading, transcribing and copying text. Our next check-in is Friday at 10 a.m.; bring your test results and flag any blockers.

Prompts deliberately preserve the demo's actual file selection, transcription and copy flow. Sample transcript text is illustrative and makes no accuracy claim.

## Mobile reading order

The user approved the desktop layout but found the alternating text/image blocks fragmented on phones. At widths up to 768 px, both illustrations appear together above the three consecutive instruction steps. Desktop keeps the existing side-by-side text and illustration rows. This is a CSS-only layout change, with no duplicate content or extra interaction.

Verified in the local browser at 390 px: both images load and precede steps 1–3, with no horizontal overflow. At 320 px there is no horizontal overflow; at 1440 px both desktop rows retain two columns. `npm test` passes the production build and all 29 existing tests. `git diff --check` is clean.
