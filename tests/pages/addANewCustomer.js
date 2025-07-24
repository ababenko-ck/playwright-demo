import { expect } from '@playwright/test';

export class AddANewCustomerPage {
    constructor(page) {
        this.page = page;
        this.customersLink = page.getByRole('link', { name: 'Customers' });
        this.customersHeading = page.getByRole('heading', { name: 'Customers' });
        this.newCustomerButton = page.getByRole('button', { name: 'New Customer' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' });
        this.expDateTextbox = page.getByRole('textbox', { name: 'Exp Date *' });
        this.transactionExpDate = page.locator('input[name="expiry"]');
        // this.processButton = page.locator('.modal__footer button').filter({ hasText: 'Save' });
        this.processButton = page.locator('.modal__footer button').filter({ hasText: 'Process (' });
        this.customerCreatedHeading = page.locator('.modal__body').filter({ hasText: 'Customer created' });
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.xButton = page.locator('.icon--close--text');
        this.viewCustomerLink = page.getByRole('link', { name: 'View customer' });
        this.generalText = page.getByText('General', { exact: true });
        this.deleteCustomerButton = page.getByRole('button', { name: 'Delete customer' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.customerDeletedHeading = page.getByRole('heading', { name: 'Customer deleted' });
        this.newTransactionButton = page.getByRole('button', { name: 'New Transaction' });
        this.actionButton = page.locator('.btn--action--primary');
        this.firstCustomerInGrid = page.locator('.grid-style-even .type--ellipsis').first();
        this.amountTextbox = page.getByRole('textbox', { name: '$' });
        this.reactSelectIndicators = page.locator('.react-select__dropdown-indicator');
        this.reactSelectLastOption = page.locator('.react-select__menu-list  div').last();
        this.mmYYTextbox = page.getByRole('textbox', { name: 'MM/YY' });
        this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
        this.sendSmsReceiptCheckbox = page.locator('label[for="sendSmsReceipt"]');
        this.transactionProcessedHeading = page.getByRole('heading', { name: 'Transaction processed!' });
        this.transactionProcessedCloseButton = page.locator('.modal__close');
        this.viewTransactionButton = page.getByRole('button', { name: 'View transaction' });
        this.dialog = page.getByRole('dialog');
        this.dialogCloseButton = page.getByRole('button').filter({ hasText: /^$/ }).first();
        this.referenceNumber = page.locator('.modal__body .flex--tertiary');
        this.exportButton = page.getByRole('button', { name: 'Export' });
        this.printButton = page.getByRole('button', { name: 'Print' });
        this.iconMenuWhite = page.locator('button:has(i.icon--menu--white)');
        this.sendPaymentRequestButton = page.locator('.popover button').first();
        this.addFilterButton = page.getByText('Add Filter');
        this.FirstNameOption = page.getByText('First Name', { exact: true });
        this.FirstNameTexbox = page.getByRole('textbox', { name: 'First Name' });
        this.SearchButton = page.getByRole('button', { name: 'Search' });
        this.SendPaymentRequestHeader = page.locator('.header__breadcrumbs');
        this.loading = this.page.waitForLoadState('networkidle'); 
        this.columnLastName =  page.locator('#header-filter-billLastName');

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
        await this.amountTextbox.clear();
        await this.amountTextbox.fill(amount);
        await expect(this.reactSelectIndicators).toBeVisible();
        await this.reactSelectIndicators.click();
        await expect(this.reactSelectLastOption).toBeVisible();
        await this.reactSelectLastOption.click();
        await expect(this.cardNumberInput).toBeVisible();
        await this.cardNumberInput.clear();
        await this.cardNumberInput.fill(cardNumber)
        await expect(this.transactionExpDate).toBeVisible();
        await this.transactionExpDate.clear();
        await this.transactionExpDate.fill(expDate);
        await expect(this.processButton).toBeVisible();
        await this.processButton.click();
        await this.page.waitForTimeout(5000); // Wait for the modal to process
        await expect(this.transactionProcessedHeading).toBeVisible();
    }

    async createNewTransactionFromExistingCustomerWithCard(amount) {
        await expect(this.amountTextbox).toBeVisible();
        await this.amountTextbox.clear();
        await this.amountTextbox.fill(amount);
        await expect(this.processButton).toBeVisible();
        await this.processButton.click();
        // await this.page.waitForTimeout(5000); // Wait for the modal to process
        // await expect(this.transactionProcessedHeading).toBeVisible();
    }

    async createNewCustomer(lastName, expDate, cardNumber) {
        await this.newCustomerButton.click();
        await expect(this.lastNameTextbox).toBeVisible();
        await this.lastNameTextbox.click();
        await this.lastNameTextbox.clear();
        await this.lastNameTextbox.fill(lastName);
        await expect(this.expDateTextbox).toBeVisible();
        await this.expDateTextbox.click();
        await this.expDateTextbox.clear();
        await this.expDateTextbox.fill(expDate);
        await expect(this.cardNumberInput).toBeVisible();
        await this.cardNumberInput.clear();
        await this.cardNumberInput.fill(cardNumber)
        await this.processButton.click();
        await this.page.waitForTimeout(6000); // Wait for the modal to process
        await expect(this.customerCreatedHeading).toBeVisible();
    }

    async viewCustomerDetails() {
        await expect(this.viewCustomerLink).toBeVisible();
        await this.viewCustomerLink.click();
        await expect(this.generalText).toBeVisible();
    }

    async deleteCustomer() {
        await expect(this.actionButton).toBeVisible();
        await this.actionButton.click();
        await expect(this.deleteCustomerButton).toBeVisible();
        await this.deleteCustomerButton.click();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await expect(this.customerDeletedHeading).toBeVisible();
        await expect(this.xButton).toBeVisible();
        await this.xButton.click();
    }
}
