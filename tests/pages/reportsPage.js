import { Page, Locator } from '@playwright/test';

export class ReportsPage {
  constructor(page) {
    this.page = page;
    this.reportsHeading = page.getByRole('heading', { name: 'Reports', exact: true });
    this.viewReportButton = page.getByRole('button', { name: 'View Report' });
    this.saveReportButton = page.getByRole('button', { name: 'Save Report' });
    this.transactionsHeading = page.getByRole('heading');
    this.reportTypeDropdown = page.locator('div:nth-child(3) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3');
    this.allTextOption = page.getByText('All', { exact: true });
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
    this.reactModalButton = this.reactModal.getByRole('button', { name: 'Save' });
    this.modalContent = page.locator('.modal__content__wrapper');
    this.modalHeader = this.modalContent.getByText('Custom report saved', { exact: true });
    this.modalHeaderConfirm = this.modalContent.locator('.modal__header');
    this.modalButton = this.modalContent.getByRole('button', { name: 'Close' });
    this.modalButtonX = this.modalContent.locator('.icon--close--text');
    this.modalButtonDelete = this.modalContent.getByRole('button', { name: 'Delete Report' });

    this.customSavedReportsModal = page.locator('.col .spc--bottom--sml--alt').first();
    this.deleteReportButton = page.locator('[data-tooltip="Delete"]').first();

  }

   async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
  }

}
