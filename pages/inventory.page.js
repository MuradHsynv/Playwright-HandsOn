export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.prices = page.locator('.inventory_item_price');
    this.firstImage = page.locator('.inventory_item_img').first();
    this.addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.burgerBtn = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async goto() { 
    await this.page.goto('/inventory.html');
  }

  async sort(val) { 
    await this.sortSelect.selectOption(val); 
  }
  
  async addBackpackToCart() { 
    await this.addBackpack.click(); 
  }

  async addLightToCart() { 
    await this.addLight.click(); 
  }
  
  async hoverImg() { 
    await this.firstImage.hover(); 
  }
  
  async openMenu() { 
    await this.burgerBtn.click();
  }
  
  async logout() { 
    await this.openMenu(); await this.logoutLink.click(); 
  }

  async getPrices() {
    const texts = await this.prices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }
}