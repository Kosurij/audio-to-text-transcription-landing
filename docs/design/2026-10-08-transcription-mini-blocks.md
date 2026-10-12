# Three homepage reading sections

User-approved topics follow the WebToPDF homepage's method / use cases / result structure. B1 lesson 3 is the source for useful explanations, concrete examples and illustrations; these three particular topics are our adaptation, not a prescribed template.

Placement: immediately after the online-demo instructions, before extension features. English copy uses short, conversational sentences. No invented speed or accuracy statistics, fictional first-person experience, or claims of new demo functionality.

- Automatic transcription vs. typing by hand: a recording-to-draft illustration, two short paragraphs and a three-row process comparison.
- Where audio to text transcription can help: an illustrated example using the existing Team Meeting transcript, followed by meetings, lectures and interviews. The task list is explicitly a user's notes, not a claimed demo output or automatic extraction.
- Why keep a transcript alongside your recording?: a recording-plus-text illustration and four-row comparison of how each helps.

Implementation: static Astro component `src/components/TranscriptionUsesSection.astro`, semantic tables with row and column headings, scoped styles and no client JavaScript. Two simple editable SVG diagrams live in `public/transcription-guide/`; these were drawn directly as vector assets. No image generation was used. The meeting example is a responsive HTML/SVG diagram with readable text on mobile.

Design: keep the site's existing typeface and theme variables. Neutral prose with indigo (`#6366f1`) line drawings on a light (`#f8faff`) illustration background, slate (`#334155`) labels and pale indigo (`#e0e7ff`) highlighting. Left-aligned sections, thin table rules and generous spacing. No decorative badges or repeated marketing cards.

Verification: production build and 29 existing tests pass. Browser checks at 1440 px and 390 px confirm three sections, two tables, loaded illustration assets and no horizontal overflow. Mobile meeting diagram stacks vertically; tables wrap within the content width. Section anchors account for the fixed navigation bar.
