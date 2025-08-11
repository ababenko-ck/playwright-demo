import { Page, Locator, expect } from '@playwright/test';
import authData from '../data/auth';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.authCode = authData.codes.authCode;
    this.rNumber = authData.checking.routingNumber;
    this.aNumber = authData.checking.accountNumber;

    this.transactionsHeading = page.getByRole('heading', { name: 'Transactions' });
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' });
    this.generalInformationButton = page.getByRole('button', { name: 'General information' });
    this.newTransactionButton = page.getByRole('button', { name: 'New Transaction' });

    this.sidebar = page.locator('.grid-sidebar');
    this.sidebarNewTransactionButton = this.sidebar.getByRole('button', { name: 'New Transaction' });
    this.addNewTransactionHeading = page.getByRole('heading', { name: 'Add new transaction' });
    this.amountTextbox = page.getByRole('textbox', { name: '$' });

    this.processButton = page.locator('.modal__footer .btn--primary');
    this.transactionProcessedHeading = page.getByRole('heading', { name: 'Transaction processed!' });

    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.transactionExpDate = page.locator('input[name="expiry"]');
    this.transactionType = page.locator('select[name="transactionType"]');
    this.AuthCode = page.locator('input[name="authCode"]');
    this.zip = page.locator('input[name="zip"]').first();

    this.dialogCloseButton = page.locator('.modal__close');
    this.dialogXButton = page.locator('.icon--close--text');
    this.checkButton = page.getByRole('button', { name: 'Check' });
    this.accountName = page.locator('input[name="accountName"]');
    this.modal = page.locator('.modal__content__wrapper');

    this.routingNumber = page.locator('input[name="routingNumber"]');
    this.accountNumber = page.frameLocator('iframe[data-ifields-id="ach"]').locator('input[placeholder="Account number"]');
    this.accountType = page.locator('select[name="accountType"]');
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.actionButtonDropdown = page.locator('.buttondropdown');
    this.printButton = page.getByRole('button', { name: 'Print' });

    this.addFilterButton = page.getByText('Add Filter');
    this.cardNumberOption = page.getByText('Card Number', { exact: true });
    this.cardNumberTexbox = page.getByRole('textbox', { name: 'Last 4 Digits' });
    this.SubmitButton = page.getByRole('button', { name: 'Submit' });
    this.transactionTable = page.locator('.table');
    this.columnCardholderName = page.locator('#header-filter-xName');

    this.applyButton = page.locator('button.btn--primary', { hasText: 'Apply' });
    this.actionButton = page.locator('button:has(i.icon.icon--sml.icon--menu--white)');
    this.linkPaymentMethodButton = page.getByRole('button', { name: 'Link payment method' });
    this.refundButton = page.getByRole('button', { name: 'Refund' });
    this.voidButton = page.getByRole('button', { name: 'Void' });
    this.transactionRefundedHeading = page.getByRole('heading', { name: 'Transaction refunded' });
    this.transactionVoidedHeading = page.getByRole('heading', { name: 'Transaction voided' });
    this.modalCloseHeaderButton = page.locator('.modal__close--header');
    this.firstLabel = page.locator('label').first();
    this.saveButton = page.locator('button.btn--primary', { hasText: 'Save' });
  }

  async waitForPageToLoad() {
    await this.transactionTable.waitFor({ state: 'visible', timeout: 10000 });
  }

  async filterCustomersByCardholderName() {
    await expect(this.columnCardholderName).toBeVisible();
    await this.columnCardholderName.click();
    await this.columnCardholderName.fill('TestUser');
  }

  async navigateToTransactions() {
    await this.transactionsLink.click();
    await expect(this.transactionsHeading).toBeVisible();
  }

  async createNewTransactionByType(amount, expDate, cardNumber, option) {
    await this.amountTextbox.clear();
    await this.amountTextbox.fill(amount);
    await this.transactionType.click();
    await this.transactionType.selectOption(option);

    if (option === 'Post Auth') {
      await this.AuthCode.clear();
      await this.AuthCode.fill(this.authCode);
    }

    if (option === 'Save') {
      await this.zip.clear();
      await this.zip.fill('08840');
    }

    await this.cardNumberInput.fill(cardNumber);
    await this.transactionExpDate.fill(expDate);

    await expect(this.processButton).toBeVisible();
    await this.processButton.click();

    await expect(this.transactionProcessedHeading).toBeVisible();
  }

  async createNewTransactionChecking(amount, accountName, option) {
    await this.amountTextbox.clear();
    await this.amountTextbox.fill(amount);

    await this.checkButton.click();
    await this.page.waitForTimeout(2000);

    await this.accountType.click();
    await this.accountType.selectOption(option);

    await this.accountName.clear();
    await this.accountName.fill(accountName);

    await this.routingNumber.clear();
    await this.routingNumber.fill(this.rNumber);

    await this.accountNumber.fill(this.aNumber);

    await this.page.waitForTimeout(3000);
    await this.processButton.click();

    await expect(this.transactionProcessedHeading).toBeVisible();
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

  async selectCustomDateRangeWithStartAndEndDates() {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    const dayOfWeekStart = new Date(`${year}-${today.getMonth() + 1}-01`).toLocaleString('en-US', { weekday: 'short' });
    const dayOfWeekEnd = new Date(`${year}-${today.getMonth() + 1}-05`).toLocaleString('en-US', { weekday: 'short' });

    const ariaLabelStart = `${dayOfWeekStart} ${month} 01 ${year}`;
    const ariaLabelEnd = `${dayOfWeekEnd} ${month} 05 ${year}`;

    await this.page.getByRole('listitem').filter({ hasText: 'Last 7 Days' }).locator('div').click();
    await this.page.getByText('Custom', { exact: true }).click();
    await this.page.getByRole('gridcell', { name: ariaLabelStart }).click();
    await this.page.getByRole('gridcell', { name: ariaLabelEnd }).click();
    await this.page.waitForTimeout(1000);

    await this.applyButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }

  async openActionMenu() {
    await this.actionButton.click();
  }

  async linkPaymentMethod() {
    await this.linkPaymentMethodButton.click();
  }

  async refundTransaction() {
    await this.refundButton.click();
    await this.refundButton.click();
    await expect(this.transactionRefundedHeading).toBeVisible();
    await this.modalCloseHeaderButton.click();
  }

  async voidTransaction() {
    await this.voidButton.click();
    await this.voidButton.click();
    await expect(this.transactionVoidedHeading).toBeVisible();
    await this.modalCloseHeaderButton.click();
  }

  async saveCustomerIDSelection() {
    await this.page.waitForSelector('td.is-loading', { state: 'detached', timeout: 10000 });
    await expect(this.firstLabel).toBeVisible();
    await this.firstLabel.click();
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }

async closeModal() {
  const closeBtn = this.page.locator('button.modal__close--header').first();
  await expect(closeBtn).toBeVisible({ timeout: 5000 });
  await closeBtn.click({ force: true });
  await expect(closeBtn).toBeHidden({ timeout: 5000 });
}

async openTransactionSidebarPopoverMenu() {
  const actionButton = this.page.locator('button:has(i.icon.icon--sml.icon--menu--white)').first();
  await expect(actionButton).toBeVisible({ timeout: 5000 });
  await actionButton.click();
}
async waitForLoadingToFinish() {
  const loader = this.page.locator('.loading-spinner');
  await loader.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}); // ako nije odmah vidljiv, nastavi
  await loader.waitFor({ state: 'hidden', timeout: 10000 });
}

async selectFirstCustomerInList() {
  const firstCustomer = this.page.locator('.customer-list-row').first();
  await firstCustomer.waitFor({ state: 'visible', timeout: 5000 });
  await firstCustomer.click();
}


}



