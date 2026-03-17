<template>
  <section class="social-proof">
    <div class="social-proof-container">
      <div class="proof-item">
        <span class="proof-value">10,000+</span>
        <span class="proof-label">Users</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-value">★ 4.8</span>
        <span class="proof-label">Average Rating</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-value">500+</span>
        <span class="proof-label">Reviews on Chrome Web Store</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item proof-item--badge">
        <!-- Chrome icon from simpleicons.org/icons/googlechrome (CC0).
             fill="#4285F4" — hardcoded Google blue, intentionally not dark-mode adaptive (brand color). -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 13.636a1.636 1.636 0 1 1 0-3.273 1.636 1.636 0 0 1 0 3.273z" fill="#4285F4"/>
        </svg>
        <span class="proof-label">Chrome Web Store</span>
      </div>
      <!-- Product Hunt badge: intentionally excluded — add only if active Product Hunt page exists (per spec). -->
    </div>
  </section>
</template>

<style scoped>
.social-proof {
  padding: 20px 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.social-proof-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.proof-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.proof-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.proof-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.proof-divider {
  width: 1px;
  height: 24px;
  background: var(--color-border);
}

@media (max-width: 600px) {
  .social-proof-container {
    gap: 16px;
  }

  .proof-divider {
    display: none;
  }

  .proof-item {
    flex-direction: column;
    gap: 2px;
    text-align: center;
  }
}
</style>
