import Locator from '../helpers/Locator';

export class ReportsPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.reportsHeading = this.locator.getByRoleName('heading', 'Reports', this.page, { exact: true });
    this.viewReportButton = this.locator.getByRoleName('button', 'View Report');
    this.saveReportButton = this.locator.getByRoleName('button', 'Save Report');
    this.cardFirst = page.locator('.col .card').first();
    this.exportButton = this.locator.getByRoleName('button', 'Export', this.cardFirst, { exact: true });
    this.printButton = this.locator.getByRoleName('button', 'Print', this.cardFirst, { exact: true });
    this.saveReportButton = this.locator.getByRoleName('button', 'Save Report', this.cardFirst, { exact: true });
    this.viewReportButton = this.locator.getByRoleName('button', 'View Report', this.cardFirst, { exact: true });
    this.transactionsHeading = this.locator.getByRoleName('heading');
    this.reportTypeDropdown = page.locator('div:nth-child(3) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3');
    this.allTextOption = this.locator.getByText('All', { exact: true });
    this.otherReportsViewIcon = page.locator('div.card:has-text("Other Reports") .icon--view');
    this.todayCardLocator = page.locator('.card .rc-menu-input-text');
    this.datepickerTooltip = page.locator('.rc-menu-datepicker-tooltip');
    this.sevenDaysOption = this.datepickerTooltip.getByText('7 days');
    this.transactionTypeInput = page.locator('.react-select__input').first();
    this.transactionTypeListedValues = page.locator('.react-select__value-container--is-multi');
    this.transactionTypeDropDown = page.locator('.react-select__menu');
    this.transactionStatusInput = page.locator('.react-select__input').last();
    this.transactionStatusListedValue = page.locator('.react-select__single-value').last();
    this.reactModal = page.locator('.ReactModal__Content');
    this.reactModalHeader = page.locator('.ReactModal__Content .modal__header');
    this.reactModalInput = page.locator('.ReactModal__Content input');
    // this.reactModalButton = page.locator('.ReactModal__Content button');
    this.reactModalButton = this.locator.getByRoleName('button', 'Save', this.reactModal);
    this.modalContent = page.locator('.modal__content__wrapper');
    this.modalHeader = this.modalContent.getByText('Custom report saved', { exact: true });
    this.modalHeaderConfirm = this.modalContent.locator('.modal__header');
    this.modalButton = this.locator.getByRoleName('button', 'Close', this.modalContent);
    this.modalButtonX = this.modalContent.locator('.icon--close--text');
    this.modalButtonDelete = this.locator.getByRoleName('button', 'Delete Report', this.modalContent);
    this.modalButtonSaveAsNew = this.locator.getByRoleName('button', 'Save As New', this.modalContent);
    this.customSavedReportsModal = page.locator('.col .spc--bottom--sml--alt').first();
    this.deleteReportButton = page.locator('[data-tooltip="Delete"]').first();
    this.editReportButton = page.locator('[data-tooltip="Edit"]').first();
    this.exportReportButton = page.locator('[data-tooltip="Export"]').first();
    this.invoiceLabel = page.locator('label[for="Invoice"]');
    this.invoiceTextbox = page.locator('#invoice');
    this.card = page.locator('.col .card').last();
    this.exportOtherReportsButton = this.card.locator('[data-tooltip="Export"]').last();
    this.advanceFiltersLink = this.locator.getByRoleName('link', 'Advance filters');
    this.hideAdvanceFiltersLink = this.locator.getByRoleName('link', 'Hide advance filters');
    this.amountLabel = page.locator('label[for="Amount"]');
    this.amountInput = page.locator('#amount');
    this.cardNumberLabel = page.locator('label[for="Card Number"]');    
    this.cardNumberInput = page.locator('input[placeholder="Last 4 Digits"]');
    this.cardholderNameLabel = page.locator('label[for="Cardholder name"]');
    this.cardholderNameInput = page.locator('#cardholderName');
    this.cardTypeLabel = page.locator('label[for="Card type"]');
    this.cardTypeVisaLabel = page.locator('label[for="ctype-visa"]');
    this.customFieldsLabel = page.locator('label[for="Custom fields"]');
    this.customField01 = page.getByPlaceholder('Custom01');
    this.customField02 = page.getByPlaceholder('Custom02');
    this.customField03 = page.getByPlaceholder('Custom03');
  }

   async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
  }
}
