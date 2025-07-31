// feesModal.js
// Playwright Page Object Model for Fees Modal

const { expect } = require('@playwright/test');

class feesModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common Locators
    this.offsetFeeCheckbox = this.page.getByLabel('Offset fee');
    this.offsetFeeAmount = this.offsetFeeCheckbox.locator('input');
    this.allowElectronicTransferFeeNo = this.page.getByRole('radio', { name: 'allowCustomerOption' }).filter({ hasText: 'No' });
    this.allowElectronicTransferFeeYes = this.page.getByRole('radio', { name: 'allowCustomerOption' }).filter({ hasText: 'Yes' });

    // Donation Page Specific Locators

    // Subscription Page Specific Locators
    
    // Digital Item Page Specific Locators
    this.electronicTrasnferFeeCheckbox = this.page.getByLabel('Electronic Transfer Fee');
    this.electronicTransferFeeAmount = this.electronicTrasnferFeeCheckbox.locator('input');
    this.taxCheckbox = this.page.getByLabel('Tax');
    this.taxAmount = this.taxCheckbox.locator('input');
  }

  async setAmount(value) {
    await this.amount.fill(value);
  }

  async setTitle(value) {
    await this.title.fill(value);
  }

  async setDescription(value) {
    await this.description.fill(value);
  }

  async uploadFile(filePath) {
    await this.uploadFile.setInputFiles([filePath]);
  }
}

module.exports = { feesModal };