// solaCheckoutPage.js
// Playwright Page Object Model for Create Sola Checkout Page

const { expect } = require('@playwright/test');

class CreateSolaCheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Type of Page Locators
    this.donationsButton = this.page.getByRole('button', { name: 'Donations' });
    this.digitalItemButton = this.page.getByRole('button', { name: 'Digital Item Checkout' });
    this.subscriptionsButton = this.page.getByRole('button', { name: 'Subscriptions' });
  }

  async clickDonationsButton() {
    await this.donationsButton.click();
  }

  async clickDigitalItemButton() {
    await this.digitalItemButton.click();
  }

  async clickSubscriptionsButton() {
    await this.subscriptionsButton.click();
  }
}

module.exports = { CreateSolaCheckoutPage };