# Canonical trailing-slash URLs

## Goal

Stop advertising redirecting page URLs to crawlers. All indexable static pages must be linked and listed using the trailing-slash form that Netlify serves with HTTP 200.

The existing HTTP-to-HTTPS redirect remains unchanged. It is intentional, and Google may continue to report the HTTP URL under “Page with redirect”; this report entry is not an indexing error for the HTTPS target.

## URL policy

- Homepage: `https://audio-to-text-transcription.com/`
- Privacy: `https://audio-to-text-transcription.com/privacy/`
- Terms: `https://audio-to-text-transcription.com/terms/`
- Refund: `https://audio-to-text-transcription.com/refund/`
- Contact: `https://audio-to-text-transcription.com/contact/`

Netlify currently returns 301 for the four page URLs without a trailing slash and 200 for the forms above.

## Changes

1. Update the sitemap so every indexable page uses its HTTP-200 URL.
2. Update internal links to indexable pages to use the same trailing-slash URL policy.
3. Update crawl-facing links in `llms.txt` when they use the redirecting form.
4. Add a regression test that asserts the sitemap and internal navigation do not advertise the known redirecting page forms.

No redirect rules, hosting behavior, page content, metadata, or HTTP-to-HTTPS behavior will change.

## Verification

- The regression test must fail against the current redirecting URL forms before production files are changed.
- Build the static site and run the complete test suite.
- Inspect generated HTML to confirm canonical URLs end in `/` and internal links match them.
- Run `git diff --check`.

## Search Console follow-up

After deployment, resubmit the sitemap and request indexing for the final HTTPS URLs with trailing slashes. Do not remove the HTTP-to-HTTPS redirect merely to make the historical “Page with redirect” validation green.
