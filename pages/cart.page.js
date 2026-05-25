export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemNames = page.getByTestId('inventory-item-name');
    this.continueShoppingBtn = page.getByTestId('continue-shopping');
    this.checkoutBtn = page.getByTestId('checkout');
  }
  
  // Get all items in cart.
  async getCartItems() {
    return this.cartItemNames.allTextContents();
  }

  // Remove an item from cart by name.
  async removeItem(itemName) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    const removeBtn = this.page.getByTestId(`remove-${slug}`);
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
