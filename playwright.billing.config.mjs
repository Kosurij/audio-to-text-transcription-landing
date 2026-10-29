import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:4323', headless: true },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4323 --ignore-lock',
    url: 'http://127.0.0.1:4323/subscribe/',
    reuseExistingServer: false,
    env: {
      PUBLIC_WEB_BILLING_ENABLED: 'true',
      PUBLIC_BILLING_API_URL: 'https://billing.test',
    },
  },
});
