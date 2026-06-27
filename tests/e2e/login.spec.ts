import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage.js';
import { InventoryPage } from '../../src/pages/saucedemo/InventoryPage.js';
import { VALID_USER, LOGIN_SCENARIOS } from '../../src/data/users.js';

/**
 * Authentication tests against SauceDemo. The negative cases are data-driven
 * from a single source of truth (LOGIN_SCENARIOS), so adding a case is a
 * one-line data change - no new test code.
 *
 * These run with a fresh (unauthenticated) context.
 */
test.use({ baseURL: 'https://www.saucedemo.com' });

test.beforeEach(async () => {
  await allure.parentSuite('End-to-End (UI)');
  await allure.epic('Quality Engineering');
  await allure.feature('SauceDemo - Authentication');
  await allure.owner('Lewis Babe Yaka');
});

test.describe('SauceDemo login', { tag: '@regression' }, () => {
  test(
    'valid credentials reach the inventory',
    { tag: '@smoke' },
    async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(VALID_USER.username, VALID_USER.password);
      await new InventoryPage(page).expectLoaded();
    },
  );

  for (const scenario of LOGIN_SCENARIOS) {
    test(`rejects ${scenario.name}`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(scenario.username, scenario.password);
      await login.expectError(scenario.error);
    });
  }

  // Documented backlog: tracked as a skipped test so coverage gaps are visible
  // in the report (Categories -> Ignored / skipped) rather than forgotten.
  test('locks the account after repeated failed logins', async () => {
    // eslint-disable-next-line playwright/no-skipped-test -- intentional documented backlog
    test.skip(
      true,
      'Pending: brute-force lockout scenario planned for a future iteration',
    );
  });
});
