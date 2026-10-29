import { test, expect } from '@playwright/test';

const plan = {
  id: '10733',
  name: 'pro',
  minutes: 7200,
  amount: 119.99,
  currency: 'USD',
  localAmount: null,
  localCurrency: null,
  interval: 'year',
};
const empty = {
  email: 'buyer@example.com',
  account: {
    plan: null,
    planInterval: null,
    planPriceId: null,
    planExpiresAt: null,
    planCancelled: false,
    paymentIssue: null,
    forcePaywall: false,
    canPurchase: true,
  },
  plans: [plan],
  version: 'v1',
  blockedReason: null,
  pendingIntent: null,
};
const active = {
  ...empty,
  account: {
    ...empty.account,
    plan: 'pro',
    planInterval: 'year',
    planPriceId: '10733',
    planExpiresAt: '2099-01-01',
    forcePaywall: true,
  },
};
async function fixture(
  page,
  {
    account = empty,
    status = 'pending',
    seeded = false,
    configEnabled = true,
    contextDelay = 0,
  } = {},
) {
  const calls = [];
  if (seeded)
    await page.addInitScript(() =>
      localStorage.setItem(
        'pw-912-auth-v1',
        JSON.stringify({
          access_token: 'test-access',
          refresh_token: 'test-refresh',
          expires_at: Date.now() + 3600000,
          user: {
            id: 'user-1',
            email: 'buyer@example.com',
            is_anonymous: false,
          },
        }),
      ),
    );
  await page.route('https://platform.test/**', (route) =>
    route.fulfill({ json: { ok: true } }),
  );
  await page.route('https://checkout.test/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<h1>Test payment provider</h1>',
    }),
  );
  await page.route('https://billing.test/**', async (route) => {
    const req = route.request(),
      path = new URL(req.url()).pathname;
    calls.push({
      path,
      method: req.method(),
      body: req.postDataJSON(),
      headers: req.headers(),
    });
    const headers = {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:4323',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };
    if (req.method() === 'OPTIONS')
      return route.fulfill({ status: 204, headers });
    let json;
    if (path.endsWith('/config'))
      json = {
        enabled: configEnabled,
        paywallId: '912',
        apiOrigin: 'https://platform.test',
      };
    else if (path.endsWith('/catalog'))
      json = { plans: [plan], version: 'catalog-v1' };
    else if (path.endsWith('/auth/otp/send')) json = { ok: true };
    else if (path.endsWith('/auth/otp/verify'))
      json = {
        access_token: 'test-access',
        refresh_token: 'test-refresh',
        expires_in: 3600,
        user: { id: 'user-1', email: 'buyer@example.com', is_anonymous: false },
      };
    else if (path.endsWith('/context') || path.endsWith('/restore')) {
      if (contextDelay) await new Promise((r) => setTimeout(r, contextDelay));
      json = account;
    } else if (path.includes('/intents/')) json = { status, context: account };
    else if (path.endsWith('/guest-checkout') || path.endsWith('/checkout'))
      json = {
        id: '00000000-0000-4000-8000-000000000001',
        url: 'https://checkout.test/payment',
      };
    else if (path.endsWith('/portal'))
      json = { url: 'https://checkout.test/portal' };
    else
      return route.fulfill({
        status: 404,
        headers,
        json: { code: 'not_found' },
      });
    await route.fulfill({ headers, json });
  });
  return calls;
}

test('first purchase submits email and selected annual plan without code or Authorization', async ({
  page,
}) => {
  const calls = await fixture(page);
  await page.goto('/subscribe/?plan=pro&interval=year');
  await expect(page.getByLabel('Email for your subscription')).toBeVisible();
  await expect(page.getByLabel('Sign-in code', { exact: true })).toHaveCount(0);
  await expect(page.getByText('$119.99', { exact: true })).toBeVisible();
  await page
    .getByLabel('Email for your subscription')
    .fill('buyer@example.com');
  await page
    .getByRole('button', { name: 'Continue to secure payment' })
    .click();
  await expect(page).toHaveURL('https://checkout.test/payment');
  const request = calls.find(
    (c) => c.method === 'POST' && c.path.endsWith('/guest-checkout'),
  );
  expect(request.headers.authorization).toBeUndefined();
  expect(request.body).toMatchObject({
    email: 'buyer@example.com',
    plan: 'pro',
    interval: 'year',
    version: 'catalog-v1',
  });
  expect(request.body.guestToken).toMatch(/^[a-f0-9]{64}$/);
  expect(calls.some((c) => c.path.includes('/auth/'))).toBe(false);
});

test('optional login discovers paid Tier 3 yearly and prevents repurchase', async ({
  page,
}) => {
  const calls = await fixture(page, { account: active });
  await page.goto('/subscribe/');
  await page
    .getByRole('button', { name: 'Already subscribed? Sign in to manage' })
    .click();
  await page
    .getByLabel('Email address', { exact: true })
    .fill('buyer@example.com');
  await page.getByRole('button', { name: 'Email me a sign-in code' }).click();
  await page.getByLabel('Sign-in code', { exact: true }).fill('123456');
  await page.getByRole('button', { name: 'Verify and continue' }).click();
  await expect(page.getByText('Pro · Yearly', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Manage subscription' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Continue to secure payment' }),
  ).toBeDisabled();
  expect(
    calls.filter(
      (c) => c.path.endsWith('/checkout') || c.path.endsWith('/guest-checkout'),
    ),
  ).toHaveLength(0);
});

test('return URL does not confirm purchase; guest can install without website sign-in', async ({
  page,
}) => {
  await fixture(page);
  await page.goto(
    '/subscription-result/?intent=00000000-0000-4000-8000-000000000001',
  );
  await expect(
    page.getByRole('heading', { name: 'Your subscription is active' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Add to Chrome', exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel('Sign-in code', { exact: true })).toHaveCount(0);
});

test('confirmed result remains available with new checkout disabled', async ({
  page,
}) => {
  await fixture(page, {
    account: active,
    status: 'confirmed',
    seeded: true,
    configEnabled: false,
  });
  await page.goto(
    '/subscription-result/?intent=00000000-0000-4000-8000-000000000001',
  );
  await expect(
    page.getByRole('heading', { name: 'Your subscription is active' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Add to Chrome', exact: true }),
  ).toBeVisible();
});

test('logout while account lookup is pending cannot resurrect paid state', async ({
  page,
}) => {
  await fixture(page, { account: active, seeded: true, contextDelay: 600 });
  await page.goto('/subscribe/');
  await page.getByRole('button', { name: 'Use another account' }).click();
  await page.waitForTimeout(800);
  await expect(page.getByText('Pro · Yearly', { exact: true })).toHaveCount(0);
  await expect(
    page.getByText('buyer@example.com', { exact: true }),
  ).toHaveCount(0);
});

test('guest request timeout retries same browser capability and never falls back to override', async ({
  page,
}) => {
  const calls = await fixture(page);
  let attempt = 0;
  const bodies = [];
  await page.route(
    'https://billing.test/account/web-billing/guest-checkout',
    async (route) => {
      const headers = {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:4323',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      };
      if (route.request().method() === 'OPTIONS')
        return route.fulfill({ status: 204, headers });
      const body = route.request().postDataJSON();
      bodies.push(body);
      attempt++;
      await route.fulfill(
        attempt === 1
          ? { status: 503, headers, json: { code: 'unavailable' } }
          : {
              headers,
              json: { id: 'intent', url: 'https://checkout.test/payment' },
            },
      );
    },
  );
  await page.goto('/subscribe/');
  await page
    .getByLabel('Email for your subscription')
    .fill('buyer@example.com');
  await page
    .getByRole('button', { name: 'Continue to secure payment' })
    .click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page
    .getByRole('button', { name: 'Continue to secure payment' })
    .click();
  await expect(page).toHaveURL('https://checkout.test/payment');
  expect(bodies).toHaveLength(2);
  expect(bodies[0]).toEqual(bodies[1]);
  expect(bodies[1].ignoreActivePurchase).toBeUndefined();
});

for (const width of [390, 1280])
  test(`email checkout layout and keyboard at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await fixture(page);
    await page.goto('/subscribe/?plan=pro&interval=year');
    const field = page.getByLabel('Email for your subscription');
    await expect(field).toBeVisible();
    await field.focus();
    await expect(field).toBeFocused();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `/private/tmp/subscription-checkout-${width}.png`,
      fullPage: true,
    });
  });
