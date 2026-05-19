import { test, expect } from '../fixtures.js';

test.describe('SauceDemo Mobile Testing', () => {

  test('hamburger menu is visible and cart works on mobile', async ({ inventoryPage, page }) => {
    // Check the website title
    await inventoryPage.goto();
    await expect(inventoryPage.title).toHaveText('Products');

    // Check hamburger menu
    await expect(inventoryPage.burgerBtn).toBeVisible();

    // Check add to cart
    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await inventoryPage.addToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Check menu opens and logout is visible
    await inventoryPage.openMenu();
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  });

});
