export class DisputesPage {
  constructor(page) {
    this.page = page;
    this.disputesLink = page.getByRole('link', { name: 'Disputes' });
    this.DisputesHeading = page.getByRole('heading', { name: 'Disputes' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.printButton = page.getByRole('button', { name: 'Print' });
    this.columnsButton = page.getByText('Columns');
    this.selectAllButton = page.getByText('Select all');
    this.addFilterButton = page.getByText('Add Filter');
    this.cardNumberFilter = page.getByText('Card Number');
    this.last4DigitsInput = page.getByRole('textbox', { name: 'Last 4 Digits' });
    this.transactionAmountFilter = page.getByText('Transaction Amount');
    this.transactionAmountInput = page.getByRole('textbox', { name: 'Transaction Amount' });
    this.last4DigitsInput = page.getByRole('textbox', { name: 'Last 4 Digits' });
    this.selectedCardNumberFilter = page.getByText('Card Number:');
    this.selectedTransactionAmountFilter = page.getByText('Transaction Amount: $');
    this.selectCurrency = page.getByText('Currency');
    // this.selectAllButton = page.locator('.rc-menu-list .rc-menu-list-item input').first();
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.loadingText = page.getByText('Loading...');
    this.applyButton = page.getByRole('button', { name: 'Apply' });
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