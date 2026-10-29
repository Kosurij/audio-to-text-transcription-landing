import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseSelection,
  subscriptionHref,
  canChoosePlan,
  safePaymentUrl,
  createAccountScope,
  confirmedIntent,
  BillingApi,
  createAuthFetch,
  guestCheckoutBody,
} from '../src/lib/subscriptionFlow.mjs';

test('first purchase requires an email, not an authenticated session, and never sends override', () => {
  const selection = { plan: 'pro', interval: 'year' };
  assert.deepEqual(
    guestCheckoutBody(' buyer@example.com ', selection, 'v1', 'a'.repeat(64)),
    {
      email: 'buyer@example.com',
      plan: 'pro',
      interval: 'year',
      version: 'v1',
      guestToken: 'a'.repeat(64),
    },
  );
  assert.throws(() => guestCheckoutBody('', selection, 'v1', 'a'.repeat(64)));
  assert.throws(() =>
    guestCheckoutBody(
      'buyer@example.com',
      { plan: 'free', interval: 'year' },
      'v1',
      'a'.repeat(64),
    ),
  );
});

test('selection accepts only one supported plan and billing period', () => {
  assert.deepEqual(parseSelection('?plan=starter&interval=year'), {
    plan: 'starter',
    interval: 'year',
  });
  assert.deepEqual(parseSelection(''), { plan: 'pro', interval: 'year' });
  for (const query of [
    '?plan=free&interval=year',
    '?plan=pro&interval=week',
    '?plan=pro&plan=max&interval=year',
    '?plan=pro',
  ])
    assert.equal(parseSelection(query), null);
  assert.equal(
    subscriptionHref('Basic', 'year'),
    '/subscribe/?plan=starter&interval=year',
  );
  assert.equal(subscriptionHref('Free', 'month'), null);
});

test('paid Tier 3 uses server eligibility, yearly and same monthly cannot be repurchased', () => {
  const account = {
    plan: 'pro',
    planInterval: 'month',
    canPurchase: true,
    forcePaywall: true,
  };
  assert.equal(canChoosePlan({ name: 'pro', interval: 'year' }, account), true);
  assert.equal(
    canChoosePlan({ name: 'pro', interval: 'month' }, account),
    false,
  );
  assert.equal(
    canChoosePlan({ name: 'starter', interval: 'year' }, account),
    false,
  );
  assert.equal(
    canChoosePlan({ name: 'max', interval: 'month' }, account),
    true,
  );
  assert.equal(
    canChoosePlan(
      { name: 'max', interval: 'year' },
      { ...account, planInterval: 'year' },
    ),
    false,
  );
  assert.equal(
    canChoosePlan(
      { name: 'max', interval: 'year' },
      { ...account, canPurchase: false },
    ),
    false,
  );
  assert.equal(
    canChoosePlan(
      { name: 'max', interval: 'year' },
      { ...account, paymentIssue: 'past_due', plan: null },
    ),
    false,
  );
});

test('checkout redirects reject executable, credential-bearing and non-HTTPS URLs', () => {
  assert.equal(
    safePaymentUrl('https://checkout.example.com/a?session=1'),
    'https://checkout.example.com/a?session=1',
  );
  for (const url of [
    'javascript:alert(1)',
    '//evil.example',
    'http://checkout.example',
    'https://user:pass@example.com',
    '/subscribe',
  ])
    assert.throws(() => safePaymentUrl(url));
});

test('an account change invalidates pending operations and aborts their requests', () => {
  const scope = createAccountScope();
  const first = scope.current();
  scope.reset();
  assert.equal(first.signal.aborted, true);
  assert.equal(first.isCurrent(), false);
  assert.equal(scope.current().isCurrent(), true);
});

test('only server-confirmed intent with matching entitlement shows success', () => {
  const context = {
    account: { plan: 'pro', planInterval: 'year', planPriceId: '10733' },
  };
  assert.equal(confirmedIntent({ status: 'pending', context }), false);
  assert.equal(confirmedIntent({ status: 'confirmed', context }), true);
  assert.equal(
    confirmedIntent({
      status: 'confirmed',
      context: { account: { plan: null } },
    }),
    false,
  );
  assert.equal(
    confirmedIntent({
      status: 'confirmed',
      context: { account: { ...context.account, paymentIssue: 'past_due' } },
    }),
    false,
  );
});

test('API never calls authenticated routes without a token and preserves structured errors', async () => {
  let calls = 0;
  const api = new BillingApi(
    'https://api.example',
    async () => null,
    async () => {
      calls++;
      return new Response('{}');
    },
  );
  await assert.rejects(api.request('/checkout', { body: {} }), {
    code: 'unauthorized',
  });
  assert.equal(calls, 0);
  const failed = new BillingApi(
    'https://api.example',
    async () => 'token',
    async () =>
      new Response(
        JSON.stringify({
          code: 'offer_changed',
          error: 'internal secret must not be rendered',
        }),
        { status: 409 },
      ),
  );
  await assert.rejects(
    failed.request('/checkout', { body: {} }),
    (error) =>
      error.code === 'offer_changed' && !error.message.includes('secret'),
  );
});

test('API attaches auth only to its fixed endpoint and serializes checkout selection', async () => {
  let sent;
  const api = new BillingApi(
    'https://api.example/',
    async () => 'access',
    async (url, init) => {
      sent = { url, init };
      return new Response('{"id":"intent","url":"https://checkout.example"}');
    },
  );
  const result = await api.request('/checkout', {
    body: { plan: 'pro', interval: 'year', version: 'v1' },
  });
  assert.equal(sent.url, 'https://api.example/account/web-billing/checkout');
  assert.equal(sent.init.headers.Authorization, 'Bearer access');
  assert.equal(sent.init.method, 'POST');
  assert.deepEqual(JSON.parse(sent.init.body), {
    plan: 'pro',
    interval: 'year',
    version: 'v1',
  });
  assert.equal(result.id, 'intent');
  await assert.rejects(api.request('//evil.example'), /Invalid/);
});

test('SDK fetch proxies only configured paywall OTP routes and strips extraneous headers', async () => {
  const calls = [];
  const proxy = createAuthFetch(
    'https://api.example',
    'https://platform.example',
    '860',
    async (url, init) => {
      calls.push({ url, init });
      return new Response('{}');
    },
  );
  await proxy('https://platform.example/api/v1/paywall/860/auth/otp/verify', {
    method: 'POST',
    body: '{"email":"test@example.com","token":"123456"}',
    headers: {
      Authorization: 'Bearer old-token',
      'X-Api-Key': 'never-forward',
    },
  });
  assert.equal(
    calls[0].url,
    'https://api.example/account/web-billing/auth/otp/verify',
  );
  assert.equal(calls[0].init.headers.Authorization, undefined);
  assert.equal(calls[0].init.headers['X-Api-Key'], undefined);
  await proxy('https://platform.example/api/v1/paywall/860/auth/refresh', {
    method: 'POST',
  });
  assert.equal(
    calls[1].url,
    'https://platform.example/api/v1/paywall/860/auth/refresh',
  );
  await proxy('https://different.example/api/v1/paywall/860/auth/otp/verify', {
    method: 'POST',
  });
  assert.equal(
    calls[2].url,
    'https://different.example/api/v1/paywall/860/auth/otp/verify',
  );
});
