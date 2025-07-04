import { Page, Locator, expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.transactionsHeading = page.getByRole('heading', { name: 'Transactions' });
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' });
    this.generalInformationButton = page.getByRole('button', { name: 'General information' });
    this.newTransactionButton = page.locator('button').filter({ hasText: /^New Transaction$/ });
    this.addNewTransactionHeading = page.getByRole('heading', { name: 'Add new transaction' });
    this.amountTextBox = page.getByRole('textbox', { name: '$' });
    this.sendSmsReceiptText = page.getByText('Send SMS receipt');
    this.processButton = page.locator('.modal__footer .btn--primary');
    this.transactionProcessedHeading = page.getByRole('heading', { name: 'Transaction processed!' });
    this.transactionProcessedCloseButton = page.locator('div').filter({ hasText: /^Transaction processed!$/ }).locator('i');
  }

  async verifyTransactionsHeading() {
    await expect(this.transactionsHeading).toBeVisible();
  }

  async clickTransactionRow(transactionId) {
    await this.page.getByRole('row', { name: transactionId }).getByRole('paragraph').nth(4).click();
  }

  async clickFirstTransactionInGrid() {
    await this.page.locator('.grid-style-even .type--ellipsis').first().click();
  }
}
