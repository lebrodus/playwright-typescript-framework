import * as allure from 'allure-js-commons';
import { test } from '../../src/fixtures/fixtures.js';
import { TODOS } from '../../src/data/todos.js';

/**
 * End-to-end coverage of the TodoMVC flow using the Page Object Model
 * and a custom `todoPage` fixture (app is already loaded before each test).
 *
 * Tags allow selective runs: `npm run test:smoke` / `npm run test:regression`.
 */
test.beforeEach(async () => {
  await allure.parentSuite('End-to-End (UI)');
  await allure.epic('Quality Engineering');
  await allure.feature('TodoMVC');
  await allure.owner('Lewis Babe Yaka');
});

test.describe('TodoMVC - core flows', { tag: '@regression' }, () => {
  test(
    'adds multiple todos and shows them in order',
    { tag: '@smoke' },
    async ({ todoPage }) => {
      await todoPage.addTodos(TODOS);
      await todoPage.expectVisibleTodos(TODOS);
      await todoPage.expectCount(TODOS.length);
    },
  );

  test(
    'tracks the remaining counter',
    { tag: '@smoke' },
    async ({ todoPage }) => {
      await todoPage.addTodos(TODOS);
      await todoPage.expectRemaining(3);
      await todoPage.toggleByTitle(TODOS[0]);
      await todoPage.expectRemaining(2);
    },
  );

  test('marks a todo as completed', async ({ todoPage }) => {
    await todoPage.addTodos(TODOS);
    await todoPage.toggleByTitle(TODOS[1]);
    await todoPage.expectCompleted(TODOS[1]);
  });

  test('filters by Active and Completed', async ({ todoPage }) => {
    await todoPage.addTodos(TODOS);
    await todoPage.toggleByTitle(TODOS[2]);

    await todoPage.filterBy('Completed');
    await todoPage.expectVisibleTodos([TODOS[2]]);

    await todoPage.filterBy('Active');
    await todoPage.expectVisibleTodos([TODOS[0], TODOS[1]]);
  });

  test('persists todos across reload', async ({ todoPage, page }) => {
    await todoPage.addTodos(TODOS);
    await page.reload();
    await todoPage.expectVisibleTodos(TODOS);
  });
});

test.describe('TodoMVC - input validation', { tag: '@regression' }, () => {
  test('trims whitespace-only entries', async ({ todoPage }) => {
    await todoPage.addTodo('   ');
    await todoPage.expectCount(0);
  });
});
