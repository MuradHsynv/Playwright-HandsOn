export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.checkoutBtn = page.getByTestId('checkout');

    // Step one — customer information
    this.firstName  = page.getByTestId('firstName');
    this.lastName   = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
    this.errorMsg    = page.getByTestId('error');

    // Step two — overview of the items
    this.finishBtn = page.getByTestId('finish');

    // Complete checkout
    this.completeHeader = page.getByTestId('complete-header');
  }

  // Start checkout from the cart page
  async startCheckout() {
    await this.checkoutBtn.click();
    await this.page.waitForURL(/checkout-step-one/);
  }

  /**
   * Fill the customer-information form.
   * @param {{ firstName: string, lastName: string, postalCode: string }} info
   */
  async fillInfo({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  // Same as fillInfo but uses pressSequentially instead of fill.
  async typeInfo({ firstName, lastName, postalCode }) {
    await this.firstName.pressSequentially(firstName, { delay: 20 });
    await this.lastName.pressSequentially(lastName, { delay: 20 });
    await this.postalCode.pressSequentially(postalCode, { delay: 20 });
  }

  // Click the "Continue" button on the customer-information form.
  async continue() {
    await this.continueBtn.click();
  }

  // Finish the checkout.
  async finish() {
    await this.finishBtn.click();
    await this.page.waitForURL(/checkout-complete/);
  }

  // Full path: fill info → continue → finish.
  async completeCheckout(info) {
    await this.fillInfo(info);
    await this.continue();
    await this.finish();
  }

  // Error message from customer information form.
  async getError() {
    return this.errorMsg.textContent();
  }
}
