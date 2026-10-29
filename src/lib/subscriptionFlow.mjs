const ranks = { starter: 0, pro: 1, max: 2 };
const names = { Basic: 'starter', Pro: 'pro', Max: 'max' };

export function guestCheckoutBody(email, selection, version, guestToken) {
  email = email.trim();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !Object.hasOwn(ranks, selection.plan) ||
    !['month', 'year'].includes(selection.interval) ||
    !version ||
    !/^[a-f0-9]{64}$/.test(guestToken)
  )
    throw new Error('Invalid checkout details');
  return {
    email,
    plan: selection.plan,
    interval: selection.interval,
    version,
    guestToken,
  };
}

export function parseSelection(search) {
  const params = new URLSearchParams(search);
  if (!params.has('plan') && !params.has('interval'))
    return { plan: 'pro', interval: 'year' };
  const plan = params.get('plan'),
    interval = params.get('interval');
  if (
    params.getAll('plan').length !== 1 ||
    params.getAll('interval').length !== 1 ||
    !Object.hasOwn(ranks, plan) ||
    !['month', 'year'].includes(interval)
  )
    return null;
  return { plan, interval };
}

export function subscriptionHref(name, interval) {
  return names[name] && ['month', 'year'].includes(interval)
    ? `/subscribe/?plan=${names[name]}&interval=${interval}`
    : null;
}

export function canChoosePlan(price, account) {
  if (
    !price ||
    !account?.canPurchase ||
    account.paymentIssue ||
    account.planInterval === 'year'
  )
    return false;
  if (
    !Object.hasOwn(ranks, price.name) ||
    !['month', 'year'].includes(price.interval)
  )
    return false;
  if (!account.plan) return true;
  if (!Object.hasOwn(ranks, account.plan) || account.planInterval !== 'month')
    return false;
  return (
    ranks[price.name] > ranks[account.plan] ||
    (price.name === account.plan && price.interval === 'year')
  );
}

export function safePaymentUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('Invalid payment URL');
  return url.href;
}

/** Invalidate account-scoped requests on logout, identity change and component teardown. */
export function createAccountScope() {
  let controller = new AbortController();
  return {
    reset() {
      controller.abort();
      controller = new AbortController();
    },
    current() {
      const captured = controller;
      return {
        signal: captured.signal,
        isCurrent: () => captured === controller && !captured.signal.aborted,
      };
    },
  };
}

export function confirmedIntent(result) {
  const account = result?.context?.account;
  return (
    result?.status === 'confirmed' &&
    Boolean(
      account?.plan &&
        account.planPriceId &&
        ['month', 'year'].includes(account.planInterval) &&
        !account.paymentIssue,
    )
  );
}

export class BillingError extends Error {
  constructor(code, status = 0) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

export class BillingApi {
  constructor(origin, getToken, fetcher = globalThis.fetch) {
    this.base = `${origin.replace(/\/$/, '')}/account/web-billing`;
    this.getToken = getToken;
    this.fetcher = (input, init) => fetcher(input, init);
  }
  /** @param {string} path @param {{body?: unknown, signal?: AbortSignal, authenticated?: boolean}} options */
  async request(path, { body, signal, authenticated = true } = {}) {
    if (!/^\/[a-z0-9/-]+$/.test(path) || path.startsWith('//'))
      throw new Error('Invalid API path');
    const token = authenticated ? await this.getToken() : null;
    if (authenticated && !token) throw new BillingError('unauthorized', 401);
    const timeout = AbortSignal.timeout(25000);
    const response = await this.fetcher(this.base + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      cache: 'no-store',
      credentials: 'omit',
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new BillingError('unavailable', response.status);
    }
    if (!response.ok)
      throw new BillingError(
        typeof data?.code === 'string' ? data.code : 'unavailable',
        response.status,
      );
    return data;
  }
}

/** Keep SDK session handling intact; proxy OTP only to record server-verified identity. */
export function createAuthFetch(
  apiOrigin,
  monetizeOrigin,
  paywallId,
  fetcher = globalThis.fetch,
) {
  return async (input, init) => {
    const url = new URL(
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url,
    );
    const prefix = `/api/v1/paywall/${paywallId}/auth/otp/`;
    const action = url.pathname.slice(prefix.length);
    if (
      url.origin === new URL(monetizeOrigin).origin &&
      url.pathname.startsWith(prefix) &&
      ['send', 'verify'].includes(action)
    ) {
      return fetcher(
        `${apiOrigin.replace(/\/$/, '')}/account/web-billing/auth/otp/${action}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: init?.body,
          signal: init?.signal
            ? AbortSignal.any([init.signal, AbortSignal.timeout(25000)])
            : AbortSignal.timeout(25000),
          credentials: 'omit',
          cache: 'no-store',
        },
      );
    }
    return fetcher(input, init);
  };
}
