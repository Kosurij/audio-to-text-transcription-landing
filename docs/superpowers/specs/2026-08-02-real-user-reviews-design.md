# Real Chrome Web Store Reviews Design

## Goal

Replace the fabricated testimonial content with the seven written five-star reviews currently published on the extension's Chrome Web Store review page.

## Content

- Preserve every review verbatim in its original language.
- Display the author's public Chrome Web Store name and profile image.
- Display five stars, matching the source rating.
- Do not invent roles, occupations, dates, locations, or edited quotations.
- Link the section to the public Chrome Web Store reviews page so visitors can verify the source.

## Layout

- Keep the existing section heading and visual language of the landing page.
- Display seven reviews in the original layout: one tall card beside two rows of three cards. The tall card differs only in size, without an accent border or special color treatment.
- Keep the existing touch-friendly Embla carousel on mobile.
- Use compact circular avatars for every author; fall back to the first initial if an image cannot load.

## Assets

Download public profile images into `public/reviews/` rather than hotlinking Google profile URLs. Use descriptive, stable filenames based on the author names.

## Verification

Per the product owner's direction, do not add a dedicated test for this content-only change. Run the production build after implementation.
