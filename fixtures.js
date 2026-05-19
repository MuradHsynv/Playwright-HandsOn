import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login.page.js';
import { InventoryPage } from './pages/inventory.page.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    use(new InventoryPage(page));
  }
});

export { test };
export const expect = base.expect;