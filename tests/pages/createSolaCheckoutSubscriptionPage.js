// solaCheckoutPage.js
// Playwright Page Object Model for Create Sola Checkout Page

const { expect } = require('@playwright/test');

class CreateSolaCheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Menu Locators
    this.transactionDetailsLink = this.page.getByRole('link', { name: 'Transaction Details' });
    this.paymentMethodsLink = this.page.getByRole('link', { name: 'Payment Methods' });
    this.brandSettingsLink = this.page.getByRole('link', { name: 'Brand Settings' });
    this.billingInfoLink = this.page.getByRole('link', { name: 'Billing Info' });
    this.feesLink = this.page.getByRole('link', { name: 'Fees' });
    this.tacLink = this.page.getByRole('link', { name: 'Terms and Conditions' });
    this.redirectLink = this.page.getByRole('link', { name: 'Redirect Options' });

    // Action buttons
    this.saveButton = this.page.getByRole('button', { name: 'Save Changes' });
    this.resetButton = this.page.getByRole('button', { name: 'Reset to Default' });
  }

  async clickTransactionDetailsLink() {
    await this.transactionDetailsLink.click();
  }

  async clickPaymentMethodsLink() {
    await this.paymentMethodsLink.click();
  }

  async clickBrandSettingsLink() {
    await this.brandSettingsLink.click();
  }

  async clickBillingInfoLink() {
    await this.billingInfoLink.click();
  }

  async clickFeesLink() {
    await this.feesLink.click();
  }

  async clickTacLink() {
    await this.tacLink.click();
  }

  async clickRedirectLink() {
    await this.redirectLink.click();
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickResetButton() {
    await this.resetButton.click();
  }
}

module.exports = { CreateSolaCheckoutPage };