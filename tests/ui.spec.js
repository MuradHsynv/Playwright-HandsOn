import { test, expect } from '../fixtures.js';

test.describe('SauceDemo UI Testing', () => {

  test.describe('Login Page Testing', () => {
    // Reset storage state to test login flow
    test.use({ storageState: { cookies: [], origins: [] } });

    test('valid credentials navigate to inventory', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator('.title')).toHaveText('Products');
    });

    test('invalid credentials gives error message', async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'test');
      const err = await loginPage.getError();
      expect(err).toContain('Username and password do not match');
    });
  });

  test.describe('Inventory Page Testing', () => {
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goto();
      await expect(inventoryPage.title).toBeVisible();
    });

    test('page title is "Products"', async ({ inventoryPage }) => {
      await expect(inventoryPage.title).toHaveText('Products');
    });

    test('prices are sorted low -> high', async ({ inventoryPage }) => {
      await inventoryPage.sort('lohi');
      const prices = await inventoryPage.getPrices();
      expect(prices.length).toBeGreaterThan(0);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test('hover over product image', async ({ inventoryPage }) => {
      await inventoryPage.hoverImg();
      await expect(inventoryPage.firstImage).toBeVisible();
    });

    test('add to cart increments cart item count to 1', async ({ inventoryPage }) => {
      await expect(inventoryPage.cartBadge).toHaveCount(0);
      await inventoryPage.addToCart();
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });
  });

  test.describe('Checkout Page Testing', () => {
    // Go to checkout page with an item in cart before each test
    test.beforeEach(async ({ inventoryPage, page }) => {
      await inventoryPage.goto();
      await inventoryPage.addToCart();
      await inventoryPage.cartLink.click();
      await page.locator('[data-test="checkout"]').click();
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('type info and postal code like a human and complete checkout successfully', async ({ page }) => {
      await page.locator('[data-test="firstName"]').pressSequentially('Murad', { delay: 30 });
      await page.locator('[data-test="lastName"]').pressSequentially('Huseynov', { delay: 30 });
      await page.locator('[data-test="postalCode"]').pressSequentially('123456', { delay: 30 });
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
  });

});
