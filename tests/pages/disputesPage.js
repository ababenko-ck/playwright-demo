import Locator from '../helpers/Locator';

export class DisputesPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.disputesLink = this.locator.getByRoleName('link', 'Disputes');
    this.DisputesHeading = this.locator.getByRoleName('heading', 'Disputes');
    this.exportButton = this.locator.getByRoleName('button', 'Export');
    this.printButton = this.locator.getByRoleName('button', 'Print');
    this.columnsButton = this.locator.getByText('Columns');
    this.selectAllButton = this.locator.getByText('Select all');
    this.addFilterButton = this.locator.getByText('Add Filter');
    this.cardNumberFilter = this.locator.getByText('Card Number');
    this.last4DigitsInput = this.locator.getByRoleName('textbox', 'Last 4 Digits');
    this.transactionAmountFilter = this.locator.getByText('Transaction Amount');
    this.transactionAmountInput = this.locator.getByRoleName('textbox', 'Transaction Amount');
    this.last4DigitsInput = this.locator.getByRoleName('textbox', 'Last 4 Digits');
    this.selectedCardNumberFilter = this.locator.getByText('Card Number:');
    this.selectedTransactionAmountFilter = this.locator.getByText('Transaction Amount: $');
    this.selectCurrency = this.locator.getByText('Currency');
    // this.selectAllButton = page.locator('.rc-menu-list .rc-menu-list-item input').first();
    this.doneButton = this.locator.getByRoleName('button', 'Done');
    this.loadingText = this.locator.getByText('Loading...');
    this.applyButton = this.locator.getByRoleName('button', 'Apply');
  }
  
  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');
  }

    async navigateToDisputs() {
    await this.disputesLink .click();
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
  }