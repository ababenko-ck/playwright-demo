// brandSettingsModal.js
// Playwright Page Object Model for Branhd Settings Modal

const { expect } = require('@playwright/test');

class brandSettingsModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common Locators    
    this.uploadFile = this.page.locator('.upload');
    this.backgroundColor = this.page.getByLabel('Payment Site Theme').filter({ has: this.page.getByPlaceholder('#000000') });
    this.textColor = this.page.getByLabel('Payment Site Text Color').filter({ has: this.page.getByPlaceholder('#000000') });

    // Donation Page Specific Locators

    // Subscription Page Specific Locators
    
    // Digital Item Page Specific Locators
  }

  async uploadFile(filePath) {
    await this.uploadFile.setInputFiles([filePath]);
  }

  async setBackgroundColor(color) {
    await this.backgroundColor.fill(color);
  }

  async setTextColor(color) {
    await this.textColor.fill(color);
  }
}

module.exports = { brandSettingsModal };