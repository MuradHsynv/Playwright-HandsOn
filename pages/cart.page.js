export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }
  
  // Get all items in cart.
  async getCartItems() {
    return this.cartItemNames.allTextContents();
  }

  // Remove an item from cart by name.
  async removeItem(itemName) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    const removeBtn = this.page.locator(`[data-test="remove-${slug}"]`);
    if ((await removeBtn.count()) === 0) {
        throw new Error(`Item "${itemName}" not found in cart.`);
    }
    await removeBtn.click();
  }

  // Continue to checkout from cart page.
  async checkout() {
    await this.checkoutBtn.click();
  }

  // Continue shopping from cart page.
  async continueShopping() {
    await this.continueShoppingBtn.click();
  }
}
