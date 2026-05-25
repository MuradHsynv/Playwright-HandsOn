import { test, expect } from '../fixtures.js';
import formData from '../data/formData.json';

test.describe('SauceDemo UI Testing', () => {

  test.describe('Login Page Testing', () => {
    // Reset storage state to test login flow
    test.use({ storageState: { cookies: [], origins: [] } });

    test('valid credentials navigate to inventory', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(process.env.APP_USERNAME, process.env.APP_PASSWORD);
      await expect(page, 'Should navigate to inventory page after login').toHaveURL(/inventory/);
      await expect(page.locator('.title'), 'Inventory page title should be "Products"').toHaveText('Products');
    });

    test('invalid credentials gives error message', async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(process.env.APP_USERNAME, 'test');
      const err = await loginPage.getError();
      expect(err, 'Error message should indicate invalid credentials').toContain('Username and password do not match');
    });
  });

  test.describe('Inventory Page Testing', () => {
    // Go to inventory page before each test
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goto();
      await expect(inventoryPage.title, 'Inventory page title should be visible').toBeVisible();
    });

    test('page title is "Products"', async ({ inventoryPage }) => {
      await expect(inventoryPage.title, 'Inventory page title should be "Products"').toHaveText('Products');
    });

    test('prices are sorted low -> high', async ({ inventoryPage }) => {
      await inventoryPage.sort('lohi');
      const prices = await inventoryPage.getPrices();
      expect(prices.length, 'There should be at least one price').toBeGreaterThan(0);
      expect(prices, 'Prices should go from lowest to highest').toEqual([...prices].sort((a, b) => a - b));
    });

    test('hover over product image', async ({ inventoryPage }) => {
      await inventoryPage.hoverImg();
      await expect(inventoryPage.firstImage, 'First product image should be visible on hover').toBeVisible();
    });

    test('add to cart increments cart item count', async ({ inventoryPage }) => {
      await expect(inventoryPage.cartBadge, 'Cart badge should show 0 before adding items').toHaveCount(0);
      await inventoryPage.addBackpackToCart();
      await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding backpack item').toHaveText('1');
      await inventoryPage.addLightToCart();
      await expect(inventoryPage.cartBadge, 'Cart badge should show 2 after adding light item').toHaveText('2');
    });
  });

  test.describe('Cart Page Testing', () => {
    // Go to cart page with multiple items in cart before each test
    test.beforeEach(async ({ inventoryPage }) => {
      await inventoryPage.goto();
      await inventoryPage.addBackpackToCart();
      await inventoryPage.addLightToCart();
      await inventoryPage.cartLink.click();
    });
    
    test('Verify cart page URL', async ({ page }) => {
      await expect(page, 'Cart page URL should be correct').toHaveURL(/cart/);
    });

    test('Verify items in cart', async ({ cartPage }) => {
      const items = await cartPage.getCartItems();
      expect(items.length, 'Cart should contain 2 items').toBe(2);
      expect(items, 'It should have Sauce Labs Backpack').toContain('Sauce Labs Backpack');
      expect(items, 'It should have Sauce Labs Bike Light').toContain('Sauce Labs Bike Light');
    });

    test('Remove an item from cart', async ({ cartPage }) => {
      await cartPage.removeItem('Sauce Labs Backpack');
      const items = await cartPage.getCartItems();
      expect(items.length, 'Cart should contain 1 item after removal').toBe(1);
      expect(items, 'Remaining item should be Sauce Labs Bike Light').toContain('Sauce Labs Bike Light');
    });

    test('Cart continue shopping navigates back to inventory', async ({ cartPage, page }) => {
      await cartPage.continueShopping();
      await expect(page, 'Cart continue shopping should navigate back to inventory').toHaveURL(/inventory/);
    });

    test('Cart checkout button navigates to checkout page', async ({ cartPage, page }) => {
      await cartPage.checkout();
      await expect(page, 'Cart checkout button should navigate to checkout page').toHaveURL(/checkout-step-one/);
    });
  });

  test.describe('Checkout Page Testing', () => {
    // Go to checkout step one with an item in cart before each test
    test.beforeEach(async ({ inventoryPage, checkoutPage }) => {
      await inventoryPage.goto();
      await inventoryPage.addBackpackToCart();
      await inventoryPage.cartLink.click();
      await checkoutPage.startCheckout();
    });

    test('fill info and complete checkout successfully', async ({ checkoutPage }) => {
      await checkoutPage.completeCheckout({
        firstName: formData.name,
        lastName: formData.surname,
        postalCode: formData.postalCode,
      });
      await expect(checkoutPage.completeHeader, 'Checkout complete header should display thank you message').toHaveText('Thank you for your order!');
    });

    test('Complete checkout successfully', async ({ checkoutPage }) => {
      await checkoutPage.typeInfo({
        firstName: formData.name,
        lastName: formData.surname,
        postalCode: formData.postalCode,
      });
      await checkoutPage.continue();
      await checkoutPage.finish();
      await expect(checkoutPage.completeHeader, 'Checkout complete header should display thank you message').toHaveText('Thank you for your order!');
    });

    test('missing first name shows validation error', async ({ checkoutPage }) => {
      await checkoutPage.fillInfo({ firstName: '', lastName: formData.surname, postalCode: formData.postalCode });
      await checkoutPage.continue();
      const err = await checkoutPage.getError();
      expect(err, 'Error message should indicate missing first name').toContain('First Name is required');
    });
  });

});
