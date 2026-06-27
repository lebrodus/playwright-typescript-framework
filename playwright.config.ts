import { defineConfig, devices } from '@playwright/test';

/**
 * Central Playwright configuration.
 * - E2E / web suites run against the public Playwright TodoMVC + docs site.
 * - API suite uses a dedicated request baseURL (see tests/api).
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        environmentInfo: {
          Project: 'Playwright TypeScript Framework',
          Framework: 'Playwright + TypeScript',
          Owner: 'Lewis Babe Yaka',
          Node: process.version,
          OS: `${process.platform} ${process.arch}`,
        },
        categories: [
          { name: 'Ignored / skipped', matchedStatuses: ['skipped'] },
          { name: 'Product defects', matchedStatuses: ['failed'] },
          { name: 'Test defects (broken)', matchedStatuses: ['broken'] },
          {
            name: 'Outdated visual baseline',
            matchedStatuses: ['failed'],
            messageRegex: '.*[Ss]creenshot comparison failed.*',
          },
        ],
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://demo.playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  projects: [
    // Auth setup: logs in once and saves the session (storageState).
    // Authenticated specs (checkout) reuse it instead of logging in per test.
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    // Functional projects (run in CI). Visual + setup specs are excluded;
    // visual snapshots are OS-specific and would break a cross-platform matrix.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testIgnore: [/visual\//, /.*\.setup\.ts/],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
      testIgnore: [/visual\//, /.*\.setup\.ts/],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
      testIgnore: [/visual\//, /.*\.setup\.ts/],
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      dependencies: ['setup'],
      testIgnore: [/(api|visual)\//, /.*\.setup\.ts/],
    },

    // Visual regression project (run locally: `npm run test:visual`).
    {
      name: 'visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /visual\//,
    },
  ],
});
