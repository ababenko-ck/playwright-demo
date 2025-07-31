// transactionDetailsModal.js
// Playwright Page Object Model for Transaction Details Modal

const { expect } = require('@playwright/test');

class transactionDetailsModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common Locators    
    this.amount = this.page.getByRole('textbox', { name: 'total' });
    this.title = this.page.getByRole('textbox', { name: 'title' });
    this.description = this.page.getByRole('textbox', { name: 'description' });
    this.uploadFile = this.page.locator('.upload');

    // Donation Page Specific Locators

    // Subscription Page Specific Locators
    
    // Digital Item Page Specific Locators
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

module.exports = { transactionDetailsModal };