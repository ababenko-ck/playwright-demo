import { Page, Locator, expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.transactionsHeading = page.getByRole('heading');
  }

  async verifyTransactionsHeading() {
    await expect(this.transactionsHeading).toContainText('Transactions');
  }
}
