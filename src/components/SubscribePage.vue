<template>
  <main class="subscribe-page">
    <a class="back-link" href="/#pricing">← All plans</a>
    <header>
      <p class="eyebrow">Audio To Text Transcription</p>
      <h1>
        {{ resultPage ? 'Your subscription' : 'Make more room for your words' }}
      </h1>
      <p class="intro">
        For the Chrome extension on your computer. This subscription does not
        increase the website demo limits.
      </p>
    </header>

    <div v-if="initializing" class="panel" role="status">Loading checkout…</div>
    <section v-else-if="initializationFailed" class="panel" role="alert">
      <h2>Checkout is temporarily unavailable</h2>
      <p>{{ error }}</p>
      <AppButton @click="reload">Try again</AppButton
      ><a class="secondary-link" href="/contact/">Contact support</a>
    </section>
    <section v-else-if="!enabled" class="panel">
      <h2>Subscribe in the extension</h2>
      <p>
        You can install Audio To Text Transcription and choose your plan there.
      </p>
      <InstallButton>Add to Chrome</InstallButton>
    </section>
    <div v-else class="checkout-layout">
      <section class="panel account-panel" aria-labelledby="account-title">
        <h2 id="account-title">
          {{
            userId
              ? 'Your account'
              : manageMode
                ? 'Sign in to your account'
                : resultPage
                  ? 'Start using your subscription'
                  : 'Your email'
          }}
        </h2>
        <template v-if="!userId && !manageMode">
          <template v-if="resultPage">
            <p>
              Install the extension in Chrome on your computer, then sign in
              with the email you used to pay. Your subscription will appear in
              your account.
            </p>
            <InstallButton>Add to Chrome</InstallButton>
            <p class="privacy-note">
              You can also sign in here to confirm your subscription or restore
              a purchase.
            </p>
          </template>
          <template v-else>
            <p>
              Your subscription will be linked to this email. Use the same email
              when you sign in to the extension.
            </p>
            <label for="checkout-email">Email for your subscription</label>
            <input
              id="checkout-email"
              v-model="email"
              type="email"
              autocomplete="email"
              maxlength="254"
              required
              :disabled="!!busy"
              @keyup.enter="checkout"
            />
            <p class="privacy-note">
              No sign-in code or password is needed to make your first purchase.
            </p>
          </template>
          <button
            class="text-button secondary-link"
            type="button"
            @click="manageMode = true"
          >
            {{
              resultPage
                ? 'Check subscription'
                : 'Already subscribed? Sign in to manage'
            }}
          </button>
        </template>
        <template v-else-if="!userId">
          <p>
            Sign in with your subscription email to check your plan, restore
            access or make changes.
          </p>
          <form v-if="!codeSent" @submit.prevent="sendCode">
            <label for="billing-email">Email address</label>
            <input
              id="billing-email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              maxlength="254"
              required
              :disabled="!!busy"
            />
            <AppButton
              type="submit"
              :loading="busy === 'send'"
              :disabled="!!busy || cooldown > 0"
              >{{
                cooldown
                  ? `Send another code in ${cooldown}s`
                  : 'Email me a sign-in code'
              }}</AppButton
            >
          </form>
          <form v-else @submit.prevent="verifyCode">
            <p>
              Enter the six-digit code sent to <strong>{{ email }}</strong
              >.
            </p>
            <label for="billing-code">Sign-in code</label>
            <input
              id="billing-code"
              v-model="code"
              name="code"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              pattern="[0-9]{6}"
              maxlength="6"
              required
              :disabled="!!busy"
            />
            <AppButton
              type="submit"
              :loading="busy === 'verify'"
              :disabled="!!busy"
              >Verify and continue</AppButton
            >
            <div class="inline-actions">
              <button
                type="button"
                class="text-button"
                :disabled="!!busy || cooldown > 0"
                @click="sendCode"
              >
                {{ cooldown ? `Resend in ${cooldown}s` : 'Resend code' }}
              </button>
              <button
                type="button"
                class="text-button"
                :disabled="!!busy"
                @click="changeEmail"
              >
                Change email
              </button>
            </div>
          </form>
          <button
            v-if="!resultPage"
            class="text-button secondary-link"
            type="button"
            :disabled="!!busy"
            @click="manageMode = false"
          >
            Back to first purchase
          </button>
        </template>
        <template v-else>
          <p class="account-email">{{ context?.email || sessionEmail }}</p>
          <button class="text-button" type="button" @click="signOut">
            Use another account
          </button>
          <p v-if="busy === 'check'" role="status">
            Checking your subscription…
          </p>
          <template v-if="context && checked">
            <div v-if="context.account.plan" class="current-plan">
              <span class="eyebrow">Current subscription</span>
              <h3>
                {{ planName(context.account.plan) }} ·
                {{
                  context.account.planInterval === 'year' ? 'Yearly' : 'Monthly'
                }}
              </h3>
              <p v-if="context.account.planExpiresAt">
                {{
                  context.account.planCancelled
                    ? 'Access until'
                    : 'Paid through'
                }}
                {{ formatDate(context.account.planExpiresAt) }}
              </p>
              <p v-if="context.account.planInterval === 'year'">
                Your yearly subscription is already active. You do not need to
                buy it again.
              </p>
            </div>
            <p v-else-if="!context.blockedReason">No paid subscription yet.</p>
            <p v-if="context.blockedReason" class="notice">
              {{ blockedMessage }}
            </p>
            <div class="inline-actions">
              <button
                v-if="context.account.plan || context.account.paymentIssue"
                class="text-button"
                type="button"
                :disabled="!!busy"
                @click="openPortal"
              >
                Manage subscription
              </button>
              <button
                class="text-button"
                type="button"
                :disabled="!!busy"
                @click="refresh(true)"
              >
                Restore purchases
              </button>
            </div>
          </template>
          <button
            v-if="!checked && !busy"
            class="text-button"
            type="button"
            @click="refresh()"
          >
            Check subscription again
          </button>
        </template>
        <div v-if="error" class="error" role="alert">
          {{ error }} <a href="/contact/">Contact support</a>
        </div>
        <p class="privacy-note">
          Your payment details are handled by our payment provider.
          <a href="/privacy/">Privacy policy</a>
        </p>
      </section>

      <section
        v-if="resultPage"
        class="panel order-panel"
        aria-labelledby="result-title"
        aria-live="polite"
      >
        <h2 id="result-title">
          {{
            confirmed
              ? 'Your subscription is active'
              : !userId
                ? 'Payment and access'
                : 'Confirming your subscription'
          }}
        </h2>
        <template v-if="confirmed">
          <p>
            Your {{ planName(context?.account.plan) }} subscription is ready to
            use in the Chrome extension.
          </p>
          <ol class="next-steps">
            <li>Install the extension in Chrome on your computer.</li>
            <li>Open Audio To Text Transcription.</li>
            <li>
              Sign in with <strong>{{ context?.email }}</strong> to use your
              minutes.
            </li>
          </ol>
          <InstallButton>Add to Chrome</InstallButton>
        </template>
        <template v-else>
          <p>
            {{
              !userId
                ? 'If you completed payment, your subscription will be available after you sign in to the extension. This page alone does not confirm payment. Use Check subscription if you want to verify it here.'
                : !intentId
                  ? 'Check your account to see your current access. Opening this page does not confirm a payment.'
                  : 'We’re checking that your payment has reached your account. This can take a little time.'
            }}
          </p>
          <p v-if="pollExpired">
            Still confirming. Please check again or restore purchases. You do
            not need to pay again.
          </p>
          <AppButton v-if="userId" :disabled="!!busy" @click="refresh()"
            >Check again</AppButton
          >
        </template>
        <a class="text-button secondary-link" href="/subscribe/"
          >Back to your account</a
        >
      </section>

      <section v-else class="panel order-panel" aria-labelledby="order-title">
        <h2 id="order-title">Your plan</h2>
        <form @submit.prevent="checkout">
          <label for="billing-plan">Plan</label>
          <select
            id="billing-plan"
            v-model="selection.plan"
            :disabled="!!busy"
            @change="selectionChanged"
          >
            <option value="starter">Basic — 2,400 minutes / 30 days</option>
            <option value="pro">Pro — 7,200 minutes / 30 days</option>
            <option value="max">Max — 14,000 minutes / 30 days</option>
          </select>
          <label for="billing-interval">Billing period</label>
          <select
            id="billing-interval"
            v-model="selection.interval"
            :disabled="!!busy"
            @change="selectionChanged"
          >
            <option value="year">Yearly</option>
            <option value="month">Monthly</option>
          </select>
          <div class="order-total">
            <p class="amount">
              {{
                money(
                  selectedPrice?.localAmount ??
                    selectedPrice?.amount ??
                    advertisedAmount,
                  selectedPrice?.localCurrency ??
                    selectedPrice?.currency ??
                    'USD',
                )
              }}
            </p>
            <p>
              Billed
              {{ selection.interval === 'year' ? 'annually' : 'monthly' }} ·
              renews automatically
            </p>
            <p>
              {{ selectedMinutes.toLocaleString('en-US') }} minutes every 30
              days
            </p>
            <small>Any applicable taxes are shown at checkout.</small>
          </div>
          <label v-if="isUpgrade && eligible" class="confirmation">
            <input
              v-model="upgradeConfirmed"
              type="checkbox"
              :disabled="!!busy"
            />
            <span v-if="selection.interval === 'year'"
              >I understand that the full year is charged now. My current
              subscription will be replaced after payment, unused paid monthly
              minutes will move to Extra Minutes, and my new quota starts
              immediately.</span
            >
            <span v-else
              >I understand that this upgrade starts a new monthly subscription
              now and replaces my current subscription after successful
              payment.</span
            >
          </label>
          <p
            v-if="userId && checked && !eligible && !context?.pendingIntent"
            class="notice"
          >
            {{
              context?.blockedReason
                ? blockedMessage
                : 'This change is not available for your current subscription. You can manage your subscription in your account.'
            }}
          </p>
          <div v-if="context?.pendingIntent" class="notice">
            <p>
              A payment is already in progress. Resume it to avoid a second
              payment.
            </p>
            <AppButton
              v-if="context.pendingIntent.url"
              :disabled="!!busy"
              type="button"
              @click="resumePayment"
              >Resume secure payment</AppButton
            >
            <button
              v-else
              class="text-button"
              type="button"
              :disabled="
                !!busy || !eligible || (isUpgrade && !upgradeConfirmed)
              "
              @click="checkout"
            >
              Retry the pending payment request
            </button>
            <a
              class="secondary-link"
              :href="`/subscription-result/?intent=${encodeURIComponent(context.pendingIntent.id)}`"
              >Check payment status</a
            >
          </div>
          <p v-else-if="!purchaseEnabled" class="notice">
            New website purchases are not available right now. You can subscribe
            in the extension and manage an existing subscription here.
          </p>
          <AppButton
            v-else
            type="submit"
            :loading="busy === 'checkout'"
            :disabled="
              (!userId && manageMode) ||
              (userId && !checked) ||
              !eligible ||
              !!busy ||
              (isUpgrade && !upgradeConfirmed)
            "
            >Continue to secure payment</AppButton
          >
          <p class="terms">
            Cancel anytime ·
            <a href="/refund/">14-day money-back guarantee</a>.<br />By
            continuing, you agree to our <a href="/terms/">Terms of Service</a>.
          </p>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import AppButton from './AppButton.vue';
import InstallButton from './InstallButton.vue';
import { plans } from '../data/pricing';
import {
  createWebBilling,
  billingMessage,
  webBillingEnabled,
  type BillingContext,
  type BillingPlan,
} from '../lib/subscriptionBilling';
import {
  parseSelection,
  canChoosePlan,
  createAccountScope,
  confirmedIntent,
  safePaymentUrl,
  guestCheckoutBody,
} from '../lib/subscriptionFlow.mjs';

const props = withDefaults(defineProps<{ resultPage?: boolean }>(), {
  resultPage: false,
});
const initializing = ref(true),
  initializationFailed = ref(false),
  enabled = ref(true),
  purchaseEnabled = ref(false),
  userId = ref<string | null>(null);
const email = ref(''),
  sessionEmail = ref(''),
  code = ref(''),
  codeSent = ref(false),
  cooldown = ref(0);
const busy = ref(''),
  error = ref(''),
  checked = ref(false),
  confirmed = ref(false),
  pollExpired = ref(false);
const context = ref<BillingContext | null>(null),
  intentId = ref<string | null>(null),
  upgradeConfirmed = ref(false);
const manageMode = ref(false),
  catalog = ref<{ plans: BillingPlan[]; version: string } | null>(null);
const selection = reactive({
  plan: 'pro',
  interval: 'year' as 'month' | 'year',
});
const scope = createAccountScope();
let billing: Awaited<ReturnType<typeof createWebBilling>> = null;
let unsubscribe: (() => void) | undefined,
  pollTimer: ReturnType<typeof setTimeout> | undefined,
  clockTimer: ReturnType<typeof setInterval> | undefined;
let mounted = false,
  pollDeadline = 0;
let guestToken = '';
const planName = (name?: string | null) =>
  ({ starter: 'Basic', pro: 'Pro', max: 'Max' })[name || ''] || 'Free';
const selectedPrice = computed(() =>
  (context.value?.plans ?? catalog.value?.plans)?.find(
    (p) => p.name === selection.plan && p.interval === selection.interval,
  ),
);
const marketingPlan = computed(
  () => plans.find((p) => p.name === planName(selection.plan))!,
);
const advertisedAmount = computed(() =>
  selection.interval === 'year'
    ? marketingPlan.value.annualPrice!
    : marketingPlan.value.monthlyPrice,
);
const selectedMinutes = computed(
  () =>
    selectedPrice.value?.minutes ??
    Number(marketingPlan.value.minutes.replaceAll(',', '')),
);
const eligible = computed(() =>
  userId.value
    ? checked.value &&
      !context.value?.blockedReason &&
      canChoosePlan(selectedPrice.value, context.value?.account)
    : Boolean(catalog.value && selectedPrice.value),
);
const isUpgrade = computed(() => Boolean(context.value?.account.plan));
const blockedMessage = computed(() => {
  const reason = context.value?.blockedReason;
  if (reason === 'verification_required')
    return 'Verify your email again before making a new payment. Use another account to return to sign-in.';
  if (reason === 'past_due' || context.value?.account.paymentIssue)
    return 'There is an issue with your payment. Manage your subscription to update your payment method.';
  if (['geo_blocked', 'region', 'not_eligible'].includes(reason || ''))
    return 'New purchases are not available for this account. You can still use the free extension.';
  return 'We need to check your subscription before another payment. Manage your subscription or contact support.';
});
function money(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount,
  );
}
function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
function selectionChanged() {
  upgradeConfirmed.value = false;
  error.value = '';
}
function reload() {
  window.location.reload();
}
function stopPolling() {
  if (pollTimer) clearTimeout(pollTimer);
  pollTimer = undefined;
}
function clearAccount() {
  scope.reset();
  stopPolling();
  context.value = null;
  checked.value = false;
  confirmed.value = false;
  upgradeConfirmed.value = false;
  busy.value = '';
  error.value = '';
  pollExpired.value = false;
}
async function sendCode() {
  if (!billing || busy.value || cooldown.value) return;
  const op = scope.current();
  busy.value = 'send';
  error.value = '';
  try {
    await billing.auth.sendOtp({ email: email.value.trim() });
    if (!op.isCurrent()) return;
    email.value = email.value.trim();
    codeSent.value = true;
    cooldown.value = 60;
    await nextTick();
    document.getElementById('billing-code')?.focus();
  } catch (e) {
    if (op.isCurrent()) error.value = billingMessage(e);
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
async function verifyCode() {
  if (!billing || busy.value) return;
  const op = scope.current();
  busy.value = 'verify';
  error.value = '';
  try {
    await billing.auth.verifyOtp({
      email: email.value.trim(),
      token: code.value,
      type: 'email',
    });
    code.value = '';
  } catch (e) {
    if (op.isCurrent()) error.value = billingMessage(e);
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
function changeEmail() {
  codeSent.value = false;
  code.value = '';
  error.value = '';
}
async function signOut() {
  clearAccount();
  userId.value = null;
  sessionEmail.value = '';
  email.value = '';
  code.value = '';
  codeSent.value = false;
  guestToken = '';
  try {
    localStorage.removeItem('att-guest-checkout-token-v1');
  } catch {
    /* storage can be unavailable */
  }
  await billing?.auth.signOut().catch(() => {});
}
async function refresh(restore = false) {
  if (!billing || !userId.value || busy.value) return;
  const op = scope.current();
  busy.value = 'check';
  error.value = '';
  checked.value = false;
  stopPolling();
  try {
    if (restore)
      await billing.api.request('/restore', { body: {}, signal: op.signal });
    if (!op.isCurrent()) return;
    if (props.resultPage && intentId.value) {
      const result = await billing.api.request(`/intents/${intentId.value}`, {
        signal: op.signal,
      });
      if (!op.isCurrent()) return;
      context.value = result.context;
      confirmed.value = confirmedIntent(result);
      if (!confirmed.value && result.status === 'pending') {
        if (Date.now() < pollDeadline)
          pollTimer = setTimeout(() => refresh(), 5000);
        else pollExpired.value = true;
      } else if (result.status === 'review')
        error.value = billingMessage({ code: 'manual_review' });
    } else {
      const nextContext = await billing.api.request('/context', {
        signal: op.signal,
      });
      if (!op.isCurrent()) return;
      context.value = nextContext;
    }
    checked.value = true;
  } catch (e) {
    if (!op.isCurrent()) return;
    error.value = billingMessage(e);
    if ((e as { code?: string })?.code === 'unauthorized') await signOut();
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
async function checkout() {
  if (
    !billing ||
    !purchaseEnabled.value ||
    !eligible.value ||
    busy.value ||
    (isUpgrade.value && !upgradeConfirmed.value)
  )
    return;
  if (
    !userId.value &&
    !(
      document.getElementById('checkout-email') as HTMLInputElement | null
    )?.reportValidity()
  )
    return;
  const op = scope.current();
  busy.value = 'checkout';
  error.value = '';
  try {
    if (!userId.value && !guestToken) {
      try {
        guestToken = localStorage.getItem('att-guest-checkout-token-v1') || '';
      } catch {
        /* private browsing */
      }
      if (!/^[a-f0-9]{64}$/.test(guestToken))
        guestToken = Array.from(
          crypto.getRandomValues(new Uint8Array(32)),
          (byte) => byte.toString(16).padStart(2, '0'),
        ).join('');
      try {
        localStorage.setItem('att-guest-checkout-token-v1', guestToken);
      } catch {
        /* same-tab retry still keeps key */
      }
    }
    const result = userId.value
      ? await billing.api.request('/checkout', {
          body: {
            plan: selection.plan,
            interval: selection.interval,
            version: context.value!.version,
          },
          signal: op.signal,
        })
      : await billing.api.request('/guest-checkout', {
          authenticated: false,
          body: guestCheckoutBody(
            email.value,
            selection,
            catalog.value!.version,
            guestToken,
          ),
          signal: op.signal,
        });
    if (op.isCurrent()) window.location.assign(safePaymentUrl(result.url));
  } catch (e) {
    if (!op.isCurrent()) return;
    const message = billingMessage(e);
    busy.value = '';
    upgradeConfirmed.value = false;
    if (userId.value) await refresh();
    else {
      if ((e as { code?: string })?.code === 'sign_in_required')
        manageMode.value = true;
      if ((e as { code?: string })?.code === 'offer_changed')
        await loadCatalog();
    }
    if (op.isCurrent()) error.value = message;
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
async function loadCatalog() {
  if (!billing) return;
  const op = scope.current();
  try {
    const data = await billing.api.request('/catalog', {
      authenticated: false,
      signal: op.signal,
    });
    if (op.isCurrent()) catalog.value = data;
  } catch (e) {
    if (op.isCurrent()) {
      catalog.value = null;
      error.value = billingMessage(e);
    }
  }
}
async function resumePayment() {
  if (!billing || !context.value?.pendingIntent || busy.value) return;
  const op = scope.current();
  const id = context.value.pendingIntent.id;
  busy.value = 'resume';
  error.value = '';
  try {
    const result = await billing.api.request(`/intents/${id}`, {
      signal: op.signal,
    });
    if (!op.isCurrent()) return;
    if (confirmedIntent(result))
      window.location.assign(
        `/subscription-result/?intent=${encodeURIComponent(id)}`,
      );
    else if (result.status === 'pending' && result.context.pendingIntent?.url)
      window.location.assign(safePaymentUrl(result.context.pendingIntent.url));
    else error.value = billingMessage({ code: 'manual_review' });
  } catch (e) {
    if (op.isCurrent()) error.value = billingMessage(e);
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
async function openPortal() {
  if (!billing || busy.value) return;
  const op = scope.current();
  busy.value = 'portal';
  error.value = '';
  try {
    const result = await billing.api.request('/portal', {
      body: {},
      signal: op.signal,
    });
    if (op.isCurrent()) window.location.assign(safePaymentUrl(result.url));
  } catch (e) {
    if (op.isCurrent()) error.value = billingMessage(e);
  } finally {
    if (op.isCurrent()) busy.value = '';
  }
}
onMounted(async () => {
  mounted = true;
  const parsed = parseSelection(window.location.search);
  if (parsed) Object.assign(selection, parsed);
  const ids = new URLSearchParams(window.location.search).getAll('intent');
  if (ids.length === 1 && /^[a-zA-Z0-9-]{1,80}$/.test(ids[0]))
    intentId.value = ids[0];
  try {
    const client = await createWebBilling();
    if (!mounted) {
      client?.auth.destroy();
      return;
    }
    billing = client;
    enabled.value = Boolean(billing);
    purchaseEnabled.value =
      webBillingEnabled && Boolean(client?.checkoutEnabled);
    if (billing) {
      if (!props.resultPage) await loadCatalog();
      unsubscribe = billing.auth.onAuthChange((_event, session) => {
        if (!mounted) return;
        const id = session?.user?.id || null;
        if (id === userId.value) return;
        clearAccount();
        userId.value = id;
        sessionEmail.value = session?.user?.email || '';
        pollDeadline = Date.now() + 120000;
        if (id) void refresh();
      });
      clockTimer = setInterval(() => {
        if (cooldown.value > 0) cooldown.value--;
      }, 1000);
    }
  } catch (e) {
    if (mounted) {
      error.value = billingMessage(e);
      initializationFailed.value = true;
    }
  } finally {
    if (mounted) initializing.value = false;
  }
});
onUnmounted(() => {
  mounted = false;
  scope.reset();
  stopPolling();
  if (clockTimer) clearInterval(clockTimer);
  unsubscribe?.();
  billing?.auth.destroy();
});
</script>

<style scoped>
.subscribe-page {
  max-width: 1050px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}
.back-link {
  color: var(--color-text-secondary);
  text-decoration: none;
}
header {
  max-width: 720px;
  margin: 40px 0 32px;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-primary);
}
h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.12;
  letter-spacing: -0.04em;
  margin: 12px 0 20px;
}
.intro {
  font-size: 1.05rem;
  max-width: 650px;
  line-height: 1.65;
}
p {
  line-height: 1.6;
  color: var(--color-text-secondary);
}
h2 {
  font-size: 1.35rem;
  margin: 0 0 20px;
}
h3 {
  margin: 12px 0;
}
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.panel {
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 32px;
  background: var(--color-surface);
  min-width: 0;
}
.order-panel {
  background: var(--color-surface-elevated);
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
label {
  font-size: 0.9rem;
  font-weight: 600;
}
input:not([type='checkbox']),
select {
  width: 100%;
  box-sizing: border-box;
  min-height: 48px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--color-background);
  color: var(--color-text);
  font: inherit;
}
input:focus-visible,
select:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--accent-primary);
  outline-offset: 3px;
}
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  margin: 2px 0 0;
}
.confirmation {
  display: flex;
  gap: 12px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 12px;
}
.text-button {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--accent-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
}
.text-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.inline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
.account-email {
  font-weight: 600;
  overflow-wrap: anywhere;
  color: var(--color-text);
}
.current-plan {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}
.order-total {
  padding: 16px 0;
}
.order-total p {
  margin: 6px 0;
}
.order-total .amount {
  font-size: 2.8rem;
  color: var(--color-text);
  font-weight: 750;
  letter-spacing: -0.04em;
}
.order-total small,
.privacy-note,
.terms {
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
.privacy-note {
  margin-top: 28px;
}
.terms {
  margin: 12px 0 0;
}
.notice,
.error {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.error {
  margin-top: 20px;
  color: var(--color-text);
  border-color: #c15454;
}
a {
  color: var(--accent-primary);
}
.secondary-link {
  display: block;
  margin-top: 20px;
  font-size: 0.9rem;
}
.next-steps {
  padding-left: 22px;
  line-height: 1.7;
}
.next-steps li {
  margin-bottom: 14px;
  overflow-wrap: anywhere;
}
@media (max-width: 700px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  .subscribe-page {
    padding: 28px 16px 64px;
  }
  header {
    margin-top: 28px;
  }
  .panel {
    padding: 24px 20px;
  }
}
</style>
