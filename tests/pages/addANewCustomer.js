import { expect } from '@playwright/test';
import Locator from '../helpers/Locator';

export class AddANewCustomerPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.customersLink = this.locator.getByRoleName('link', 'Customers');
    this.customersHeading = this.locator.getByRoleName('heading', 'Customers');
    this.newCustomerButton = this.locator.getByRoleName('button', 'New Customer');
    this.lastNameTextbox = this.locator.getByRoleName('textbox', 'Last Name');
    this.expDateTextbox = this.locator.getByRoleName('textbox', 'Exp Date *');
    this.transactionExpDate = page.locator('input[name="expiry"]');
    this.saveButton = this.locator.getByRoleName('button', 'Save');
    this.processButton = this.locator.getByRoleName('button', /Process \(\$/);
    this.customerCreatedHeading = page.locator('.modal__body').filter({ hasText: 'Customer created' });
    this.closeButton = this.locator.getByRoleName('button', 'Close');
    this.xButton = page.locator('.icon--close--text');
    this.viewCustomerLink = this.locator.getByRoleName('link', 'View customer');
    this.generalText = this.locator.getByText('General', { exact: true });
    this.deleteCustomerButton = this.locator.getByRoleName('button', 'Delete customer');
    this.confirmButton = this.locator.getByRoleName('button', 'Confirm');
    this.customerDeletedHeading = this.locator.getByRoleName('heading', 'Customer deleted');
    this.newTransactionButton = this.locator.getByRoleName('button', 'New Transaction');
    this.actionButton = page.locator('.btn--action--primary');
    this.firstCustomerInGrid = page.locator('.grid-style-even .type--ellipsis').first();
    this.amountTextbox = this.locator.getByRoleName('textbox', '$');
    this.reactSelectIndicators = page.locator('.react-select__dropdown-indicator');
    this.reactSelectLastOption = page.locator('.react-select__menu-list  div').last();
    this.mmYYTextbox = this.locator.getByRoleName('textbox', 'MM/YY');
    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.sendSmsReceiptCheckbox = page.locator('label[for="sendSmsReceipt"]');
    this.transactionProcessedHeading = this.locator.getByRoleName('heading', 'Transaction processed!');
    this.transactionProcessedCloseButton = page.locator('.modal__close');
    this.viewTransactionButton = this.locator.getByRoleName('button', 'View transaction');
    this.dialog = this.locator.getByRoleName('dialog');
    this.dialogCloseButton = this.locator.getByRoleName('button').filter({ hasText: /^$/ }).first();
    this.referenceNumber = page.locator('.modal__body .flex--tertiary');
    this.exportButton = this.locator.getByRoleName('button', 'Export');
    this.printButton = this.locator.getByRoleName('button', 'Print');
    this.iconMenuWhite = page.locator('button:has(i.icon--menu--white)');
    this.sendPaymentRequestButton = page.locator('.popover button').first();
    this.addFilterButton = this.locator.getByText('Add Filter');
    this.FirstNameOption = this.locator.getByText('First Name', { exact: true });
    this.FirstNameTexbox = this.locator.getByRoleName('textbox', 'First Name');
    this.SearchButton = this.locator.getByRoleName('button', 'Search');
    this.SendPaymentRequestHeader = page.locator('.header__breadcrumbs');
    this.loading = this.page.waitForLoadState('networkidle');
    this.columnLastName = page.locator('#header-filter-billLastName');
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToCustomers() {
    await this.customersLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.customersHeading).toBeVisible();
  }

  async filterCustomersByLastName() {
    await expect(this.columnLastName).toBeVisible();
    await this.columnLastName.click();
    await this.columnLastName.fill('TestUser');
  }

  async createNewTransactionFromExistingCustomer(amount, expDate, cardNumber) {
    await expect(this.amountTextbox).toBeVisible();
    await this.amountTextbox.fill(amount);
    await this.reactSelectIndicators.click();
    await this.reactSelectLastOption.click();
    await this.cardNumberInput.fill(cardNumber);
    await this.transactionExpDate.fill(expDate);
    await expect(this.processButton).toBeVisible();
    await this.processButton.click();
    await this.page.waitForTimeout(5000);
    await expect(this.transactionProcessedHeading).toBeVisible();
  }

  async createNewTransactionFromExistingCustomerWithCard(amount) {
    await this.amountTextbox.fill(amount);
    await expect(this.processButton).toBeVisible();
    await this.processButton.click();
  }

  async createNewCustomer(lastName, expDate, cardNumber) {
    await this.newCustomerButton.click();
    await this.lastNameTextbox.fill(lastName);
    await this.expDateTextbox.fill(expDate);
    await this.cardNumberInput.fill(cardNumber);
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
    await this.page.waitForTimeout(6000);
    await expect(this.customerCreatedHeading).toBeVisible();
  }

  async viewCustomerDetails() {
    await this.viewCustomerLink.click();
    await expect(this.generalText).toBeVisible();
  }

  async deleteCustomer() {
    await this.actionButton.click();
    await this.deleteCustomerButton.click();
    await this.confirmButton.click();
    await expect(this.customerDeletedHeading).toBeVisible();
    await this.xButton.click();
  }
}
