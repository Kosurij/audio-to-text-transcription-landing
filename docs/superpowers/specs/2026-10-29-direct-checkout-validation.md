# Direct checkout verification and rollout

Date: 2026-10-29. Code is prepared for review; production checkout remains disabled.

## Evidence

- Landing build + node tests: 38 passed.
- Focused Vue/TypeScript check: passed.
- Chromium browser suite with mocked provider/API: 8 passed. Covers guest email checkout without OTP/Authorization; optional OTP login and paid Tier 3 yearly; unverified return URL; confirmed result with checkout disabled; logout during lookup; retry with the same browser capability; keyboard and no horizontal overflow at 390/1280px.
- Backend unit/HTTP suite: 857 passed, 64 skipped (56 PostgreSQL cases run separately below; 8 unrelated preview PostgreSQL cases not run).
- Backend TypeScript: passed.
- Disposable PostgreSQL `subscription_test`, fresh isolated schema: 56 passed. Includes concurrent guest reservations, denial to another browser, rejected reservation release, no deletion of attached URL by a late rejection, simultaneous site/extension first login with one initial grant, signed payment before first login, existing subscription ordering and annual transfer cases.
- One parallel run of HTTP and PostgreSQL suites received an unexpected HTTP 501 in an existing lifecycle test. The isolated complete PostgreSQL rerun passed. No retry loop was added to production or tests.
- Regression RED/GREEN captured for completed guest reservations and definitive provider rejection. Independent review found the latter bug; fixed and narrow re-review approved.
- Real Monetize sandbox 912, Stripe TEST price 10736: email-only checkout returned HTTP 200, provider userId and checkout.stripe.com URL. Retrying the exact payload/idempotency key returned the same URL. No checkout was paid. An unauthenticated user lookup did not contain identity, so it does not establish cross-surface email-login equivalence.

## Rollout order

1. Keep both flags off. Deploy backend additive schema and `/account/web-billing` first. Keep existing subscription price mappings and webhook processing even when hiding new offers.
2. Configure server-only `MONETIZE_ORIGIN`, `MONETIZE_PAYWALL_ID`, `MONETIZE_API_KEY`, webhook secret and actual month/year price mappings. Set `WEB_BILLING_LANDING_ORIGIN` to the canonical site; list exact browser origins in `WEB_BILLING_ALLOWED_ORIGINS`.
3. Build landing with `PUBLIC_BILLING_API_URL` pointing to this backend. `PUBLIC_WEB_BILLING_ENABLED` defaults false. No provider secret belongs in public environment variables.
4. In a separate sandbox configuration and disposable database, complete a payment using a controlled mailbox, then login to the released extension using that email. Confirm provider ID, backend ID, plan/expiry/quota and paid Tier 3 UI. Test existing monthly/yearly, cancellation, failed payment, duplicate/delayed events and monthly-to-yearly replacement.
5. Verify managed Polar parity, provider catalog/geo behavior and published extension compatibility. Stripe TEST session creation alone does not satisfy these checks.
6. Only after those checks enable `WEB_BILLING_ENABLED=true` and rebuild landing with `PUBLIC_WEB_BILLING_ENABLED=true`. Annual offers additionally require `ANNUAL_PLANS_ENABLED=true`.

Rollback disables new checkout and paid website CTAs. Preserve `/config`, status/restore/portal, webhooks, intents and existing paid access. Unknown checkout outcomes remain reserved for reconciliation/support; never delete them simply to let a customer pay again. Only explicit provider `hasActivePurchase=true` rejection releases an unattached pending reservation automatically.

No production environment, live paywall catalog, real payment or customer email was changed during implementation.
