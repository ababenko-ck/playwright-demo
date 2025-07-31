// paymentMethodsModal.js
// Playwright Page Object Model for Payment Methods Modal

const { expect } = require('@playwright/test');

class paymentMethodsModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common Locators    
    this.creditCards = this.page.getByLabel('Credit Cards');
    this.visa = this.page.getByLabel('Visa');
    this.masterCard = this.page.getByLabel('Mastercard');
    this.discover = this.page.getByLabel('Discover');
    this.amex = this.page.getByLabel('Amex');
    this.ach = this.page.getByLabel('ACH');
    this.reenter = this.page.getByLabel('Require users to re-enter the Account and Routing Number');

    this.googlePay = this.page.getByLabel('Enable Google Pay');
    this.applePay = this.page.getByLabel('Enable Apple Pay');

    // Donation Page Specific Locators

    // Subscription Page Specific Locators
    
    // Digital Item Page Specific Locators
  }

  async toggleCreditCards() {
    await this.creditCards.check();
  }

  async toggleVisa() {
    await this.visa.check();
  }

  async toggleMasterCard() {
    await this.masterCard.check();
  }

  async toggleDiscover() {
    await this.discover.check();
  }

  async toggleAmex() {
    await this.amex.check();
  }

  async toggleACH() {
    await this.ach.check();
  }

  async toggleReenter() {
    await this.reenter.check();
  }

  async toggleGooglePay() {
    await this.googlePay.check();
  }

  async toggleApplePay() {
    await this.applePay.check();
  }
}

module.exports = { paymentMethodsModal };