import { test, expect } from '../fixtures.js';

test.describe('SauceDemo Mobile Testing', () => {

  test('hamburger menu is visible and cart works on mobile', async ({ inventoryPage, page }) => {
    // Check the website title
    await inventoryPage.goto();
    await expect(inventoryPage.title, 'Inventory page title should be "Products"').toHaveText('Products');
  
    // Check hamburger menu
    await expect(inventoryPage.burgerBtn, 'Hamburger menu button should be visible').toBeVisible();

    // Check add to cart
    await expect(inventoryPage.cartBadge, 'Cart badge should show 0 before adding items').toHaveCount(0);
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding backpack item').toHaveText('1');

    // Check menu opens and logout is visible
    await inventoryPage.openMenu();
    await expect(page.locator('#logout_sidebar_link'), 'Logout link should be visible in the menu').toBeVisible();
  });

});
