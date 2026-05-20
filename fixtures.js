import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login.page.js';
import { InventoryPage } from './pages/inventory.page.js';
import { CheckoutPage } from './pages/checkout.page.js';
import { CartPage } from './pages/cart.page.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  cartPage: async ({page}, use) => {
    await use(new CartPage(page));
  }
});

export { test };
export const expect = base.expect;