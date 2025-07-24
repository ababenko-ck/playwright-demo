import { Page, Locator, expect } from '@playwright/test';
import authData from '../data/auth';

export class TransactionsPage {
  constructor(page) {
    this.authCode = authData.codes.authCode;
    this.rNumber = authData.checking.routingNumber;
    this.aNumber = authData.checking.accountNumber;
    this.page = page;
    this.transactionsHeading = page.getByRole('heading', { name: 'Transactions' });
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' });
    this.generalInformationButton = page.getByRole('button', { name: 'General information' });
    this.newTransactionButton = page.getByRole('button', { name: 'New Transaction' });

    this.sidebar = page.locator('.grid-sidebar');
    this.sidebarNewTransactionButton = this.sidebar.getByRole('button', { name: 'New Transaction' });
    this.addNewTransactionHeading = page.getByRole('heading', { name: 'Add new transaction' });
    this.amountTextBox = page.getByRole('textbox', { name: '$' });
    this.sendSmsReceiptText = page.getByText('Send SMS receipt');
    this.processButton = page.locator('.modal__footer .btn--primary');
    this.transactionProcessedHeading = page.getByRole('heading', { name: 'Transaction processed!' });
    this.transactionProcessedCloseButton = page.locator('div').filter({ hasText: /^Transaction processed!$/ }).locator('i');
    this.amountTextbox = page.getByRole('textbox', { name: '$' });
    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.transactionExpDate = page.locator('input[name="expiry"]');
    this.processButton = page.locator('.modal__footer .btn--primary');
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
  }

   async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
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
        await this.cardNumberInput.clear();
        await this.cardNumberInput.fill(cardNumber)
        await this.transactionExpDate.clear();
        await this.transactionExpDate.fill(expDate);
        await expect(this.processButton).toBeVisible();;
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

        // await this.accountNumber.clear();
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
}
