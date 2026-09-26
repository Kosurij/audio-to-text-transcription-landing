# OG: версия в стиле лендинга

Встроенный image_gen; 26.09.2026. По уточнению владельца первая концепция заменена обложкой, близкой к hero сайта. Референсы: `public/hero_light.webp` и `assets/logo.png`. Итог: `public/og-image.png`, 1730 × 909 px. Локально заменяет первую версию, на production не опубликовано.

## Финальный промпт

Финальные уточнения: заголовок и описание выровнены по левому краю, их высота сохранена. Затем удалена точка после «in your browser». Итоговый файл `public/og-image.png`, 1730 × 909. Обе правки выполнены встроенным image_gen. Промпт последней правки:

> Use case: text-localization. Edit target: supplied existing OG cover. Make exactly ONE tiny edit: remove the blue period/full stop immediately after "browser" in the large blue headline. The headline must now read "Audio to Text" on line 1 and "in your browser" on line 2, with NO terminal punctuation. Fill the removed period area with its matching background. Preserve the left alignment, position, font size, weights, colors and line breaks of both headline lines. Preserve every other element, all other text and punctuation, brand logo/header, illustration, white background and dimensions 1730x909 unchanged. Do not recenter or move anything. Do not add a button or badge.

История предыдущих правок:

Актуальная версия после следующего уточнения: удалена большая кнопка Add to Chrome, заголовок и описание подняты и центрированы внутри левой колонки; промежуток под брендом сокращён. `public/og-image.png`, 1730 × 909, встроенный image_gen. Промпт последней правки:

> Edit the provided existing OG cover precisely to improve the LEFT TYPOGRAPHIC COMPOSITION. Keep canvas exactly 1730 x 909, white background, actual brand logo, brand header, and the entire right-side laptop/transcript illustration unchanged.
> Requested edits:
> 1. Completely remove the large blue "Add to Chrome" CTA button and its Chrome icon from the lower left; fill seamlessly with white. Do not remove the "Copy text" and "Download text" controls INSIDE the right-side illustration.
> 2. Move the large two-line headline UP by about 85 pixels, substantially reducing the oversized gap below the top brand header. Its top should be about y=265 rather than y=350. Center-align the two headline lines to each other within the LEFT text column (approximately x=75..735, center x=405). Keep the headline on TWO lines exactly: "Audio to Text" in near-black and "in your browser." in the existing blue-to-cyan gradient. Keep their typography, weight and approximate size. Center the shorter first line above the longer second line.
> 3. Move the two gray supporting lines UP with the headline, position them about 40px below the headline and CENTER-align within the same left column: "Upload files or record audio." then "Get transcripts and summaries."
> 4. Preserve the top-left brand header "Audio To Text Transcription" and logo as they are. Do not reintroduce the Chrome extension badge. Do not add any words, CTA, badges, decorations or footer.
> Ensure clean comfortable spacing between brand header and headline, a unified balanced left text group, and no text overlap with the right illustration. The result is a static social-sharing cover, not a clickable web page. Preserve all other pixels and artwork as closely as possible.

Последующая правка: по просьбе владельца через встроенный image_gen удалена только отдельная плашка Chrome extension. Файл `public/og-image.png` обновлён, размеры сохранены — 1730 × 909. Кнопка Add to Chrome сохранена. Промпт правки:

> Precise image edit of the provided Open Graph cover. Remove ONLY the small purple/lilac rounded pill badge containing a puzzle icon and the words "Chrome extension", located between the top-left brand header and the large headline. Fill its entire area seamlessly with the existing plain white background, leaving that area as intentional whitespace. Keep the original 1730 x 909 pixel dimensions and composition. Preserve EVERYTHING ELSE unchanged: exact logo and brand header, all typography, positions and sizes, "Audio to Text" / "in your browser." headline, description, blue "Add to Chrome" button including icon, laptop illustration, plant, notebook, transcript panel and all its text. Do not remove the words "Chrome extension" inside the transcript illustration; the user requested only the standalone purple badge. Do not shift elements or redesign any part of the image.

Исходный промпт второй версии:

Create a replacement Open Graph cover for the Audio To Text Transcription website, closely matching its actual landing-page hero rather than a generic infographic.
Use the TWO provided local images as references: image 1 is the EXISTING LANDING HERO ILLUSTRATION (reuse its distinctive hand-drawn pale-blue laptop video call and floating transcription card, preserve that look); image 2 is the EXACT PRODUCT LOGO (blue square with white microphone and speech bubble — preserve its design, do not replace with a generic microphone).
Output: finished full-bleed landscape bitmap, aspect ratio 1200:630 (about 1.905:1), ideally 1200x630 or higher same ratio. White background, generous whitespace. Looks like a beautifully art-directed crop of the actual landing page.
Composition: a small brand header at upper left with exact logo and product name; below it the small pill badge used on the site, then a big two-line heading left, a concise two-line description, and the blue call-to-action. Right half shows the SAME pale-blue hand-drawn hero illustration from image 1, including its floating white transcript panel, soft pale blue edges, hand-drawn laptop meeting, subtle desk details. Keep it recognizable and naturally integrated on white, not an unrelated 3D illustration. The transcript card may be simplified to avoid unreadable paragraphs: retain two timestamps and short blue/gray transcript lines, top tabs "Transcription" and "Summary", bottom "Copy text" and "Download text".
Typography: modern rounded geometric sans-serif similar to Google Sans in the website; black #202124 heading first line, blue-to-cyan gradient second line, medium gray supporting text. Blue softly rounded rectangular CTA with restrained blue shadow. Small purple-to-pink badge like the actual website. No large gradient blobs, no generic waveform-to-document arrow, no giant microphone tile, no browser chrome, no stock photo, no device enclosing the entire graphic. Keep safe 50px margins and strong readability in compact social previews.
Exact copy outside the illustration:
Brand header: "Audio To Text Transcription"
Small pill: "Chrome extension"
Headline line 1: "Audio to Text"
Headline line 2: "in your browser."
Supporting text: "Upload files or record audio."
Second supporting line: "Get transcripts and summaries."
Button: "Add to Chrome"
No other marketing text, ratings, user counts, accuracy percentages, format counts, prices, testimonials or claims about free use. Do not invent a new logo. Result must feel directly from the existing landing-page design, using its own actual illustration and logo.
