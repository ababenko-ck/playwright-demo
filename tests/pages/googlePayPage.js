// googlePayPages.js
// Playwright Page Object Model for Sola Checkout Page

const { expect } = require('@playwright/test');

class GooglePayPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Google Pay Page Specific Locators
    this.name = page.getByRole('textbox', { name: 'Email or phone' });
    this.password = page.getByRole('textbox', { name: 'Enter your password' })
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.skipButton = page.getByRole('button', { name: 'Skip' });
    this.payButton = page.locator('iframe[name="sM432dIframe"]').contentFrame().getByRole('button', { name: 'Pay', exact: true });
  }

    async setName(name) {
        await this.name.fill(name);
    }

    async setPassword(password) {
        await this.password.fill(password);
    }

    async clickNext() {
        await this.nextButton.click();
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async clickSkip() {
        await this.skipButton.click();
    }

    async clickPay() {
        await this.payButton.click();
    }
}

module.exports = { GooglePayPage };