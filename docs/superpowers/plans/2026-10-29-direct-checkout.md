# Direct checkout implementation status

Approved scope: first purchase with email and no OTP, optional authenticated subscription management, paid Tier 3 receives Tier 1/2 billing behavior through existing effective force_paywall.

Design: ../specs/2026-10-29-direct-checkout-design.md

- [x] Backend: public catalog, guest checkout, provider identity bootstrap, signed webhook before first login, authenticated management and durable idempotent reservations.
- [x] Identity: concurrent website/extension login produces one account and one grant; guest geography populated once without resetting balances.
- [x] Landing: email-only first purchase, optional OTP management, safe result state, stale response protection, pricing CTA flag.
- [x] Regression tests: guest checkout, paid Tier 3, retry and definitive rejection, owner isolation, concurrent PostgreSQL operations, responsive browser flows.
- [x] Independent review: definitive active-purchase rejection could block a subsequent signed-in upgrade. Fixed with guarded release only for explicit hasActivePurchase=true; ambiguous conflicts/timeouts remain reserved. Narrow re-review approved.
- [x] Sandbox 912 Stripe TEST: checkout creation returns provider user ID; same idempotency key returns same hosted URL. No payment performed.
- [ ] Release gate: controlled mailbox, completed sandbox payment → extension same-email login, published extension compatibility and managed Polar parity. Production flags stay off pending these checks.

Backend checkout: /private/tmp/audio-to-text-web-billing-20261029, branch codex/landing-web-billing, base 5c350c68.
Landing branch: codex/landing-direct-checkout, base annual-pricing branch 64a7905.

Source implementation is complete; release verification is separate and incomplete. Do not infer paid access or identity equivalence from a checkout URL or the unauthenticated provider /user response.
