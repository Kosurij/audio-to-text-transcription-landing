import { AuthClient } from '@monetize.software/sdk/core';
import { BillingApi, createAuthFetch } from './subscriptionFlow.mjs';

export interface BillingPlan {
  id: string;
  name: string;
  minutes: number;
  amount: number;
  currency: string;
  localAmount: number | null;
  localCurrency: string | null;
  interval: 'month' | 'year';
}
export interface BillingContext {
  email: string;
  account: {
    plan: string | null;
    planInterval: 'month' | 'year' | null;
    planPriceId: string | null;
    planExpiresAt: string | null;
    planCancelled: boolean;
    paymentIssue: string | null;
    forcePaywall: boolean;
    canPurchase: boolean;
  };
  plans: BillingPlan[];
  version: string;
  blockedReason: string | null;
  pendingIntent: { id: string; url: string | null } | null;
}

export const webBillingEnabled =
  import.meta.env.PUBLIC_WEB_BILLING_ENABLED === 'true';
export const billingApiOrigin = (
  import.meta.env.PUBLIC_BILLING_API_URL ||
  'https://api.audio-to-text-transcription.com'
).replace(/\/$/, '');

export async function createWebBilling() {
  const publicApi = new BillingApi(billingApiOrigin, async () => null);
  const config = await publicApi.request('/config', { authenticated: false });
  if (!config.paywallId || !config.apiOrigin) return null;
  if (new URL(config.apiOrigin).protocol !== 'https:')
    throw new Error('Invalid billing configuration');
  const auth = new AuthClient({
    paywallId: config.paywallId,
    apiOrigin: config.apiOrigin,
    edgeFallback: false,
    fetch: createAuthFetch(
      billingApiOrigin,
      config.apiOrigin,
      config.paywallId,
    ),
  });
  await auth.ready();
  return {
    auth,
    api: new BillingApi(billingApiOrigin, () => auth.getAccessToken()),
    checkoutEnabled: config.enabled === true,
  };
}

export function billingMessage(error: unknown): string {
  const code = (error as { code?: string })?.code;
  const messages: Record<string, string> = {
    unauthorized: 'Sign in again to check your subscription.',
    verification_required:
      'Verify your email with a new code before continuing to payment.',
    unavailable:
      'We could not check your subscription. Please try again. You have not been asked to pay again.',
    not_eligible:
      'This plan change is not available for your account. Check your current subscription below.',
    offer_changed:
      'Your plan or price has changed. Review the updated details before continuing.',
    checkout_pending:
      'You already have a payment in progress. Resume it below instead of starting another payment.',
    manual_review:
      'We need to check your subscription. Please contact support before making another payment.',
    not_found:
      'This payment is not linked to the signed-in account. Sign in with the email you used to buy your subscription.',
    sign_in_required:
      'Please sign in to check or manage your subscription before making another payment.',
    invalid_otp:
      'That code is invalid or has expired. Check the code or request a new one.',
    otp_expired: 'That code has expired. Request a new code.',
    over_email_send_rate_limit:
      'Please wait a minute before requesting another code.',
    rate_limited: 'Too many attempts. Please wait a minute and try again.',
  };
  if ((error as { status?: number })?.status === 429)
    return messages.rate_limited;
  return (
    messages[code || ''] ||
    'Something went wrong. Please try again or contact support.'
  );
}
