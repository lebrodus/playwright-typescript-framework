import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';

/**
 * Custom fixtures expose ready-to-use page objects to the tests,
 * so specs stay declarative and free of setup boilerplate.
 */
type Fixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
