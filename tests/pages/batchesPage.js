import { expect } from '@playwright/test';

export class BatchesPage {
  constructor(page) {
    this.page = page;

    this.batchesLink = page.getByRole('link', { name: 'Batches' });
    this.openBatchesButton = page.getByRole('button', { name: 'Open Batches' });
    this.closedBatchesButton = page.getByRole('button', { name: 'Closed Batches' });
    this.showSummaryButton = page.getByRole('button', { name: 'Show Summary' });
    this.breakdownByCardText = page.getByText('Breakdown by Card');
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.printButton = page.getByRole('button', { name: 'Print' });
    this.saleSummaryText = page.getByText('SALE SUMMARY BY CARD TYPE');
    this.creditSummaryText = page.getByText('CREDIT SUMMARY BY CARD TYPE');
    this.batchSummaryText = page.getByText('Batch Summary');
    this.countText = page.locator('.pie-chart-text.count');
    this.openBatchesLoaded = page.getByRole('button', { name: 'ID #' });
    this.searchByBatchNumberInput = page.getByPlaceholder('Search by Batch Number');
    this.noResultsText = page.getByText('0 results');
    this.firstOpenBatchIdElement = page.locator('div.flex--primary.type--wgt--medium').first();
    this.getViewBatchTransactionsButton = (batchId) => page.getByTestId(`view-batch-transactions-button-${batchId}`);
    this.transactionsHeading = (pageContext) => pageContext.getByRole('heading', { name: 'Transactions' });
    this.dateRangeDropdown = page.getByText('Last 30 Days'); 
    this.last7DaysOption = page.getByRole('menuitem', { name: 'Last 7 Days' }); 
    this.selectedDateRangeDisplay = page.locator('div.filter__toolbar__selected-filter').first();


  }

  async navigateToOpenBatches() {
    await this.batchesLink.click();
    await expect(this.openBatchesButton).toBeEnabled({ timeout: 10000 });
    await this.openBatchesButton.click();
    await expect(this.showSummaryButton).toBeEnabled({ timeout: 90000 });
  }

  async goToClosedBatchesDirectly() {
    await this.batchesLink.click();
    await expect(this.showSummaryButton).toBeEnabled({ timeout: 90000 });
  }

  async showSummary() {
    await this.showSummaryButton.click();
  }

  async clickExportButton() {
    await expect(this.exportButton).toBeVisible({ timeout: 10000 });
    await this.exportButton.click();
  }

  async clickPrintButton() {
    await expect(this.printButton).toBeEnabled({ timeout: 60000 });
    await this.printButton.click();
  }

  async searchForBatchNumber(batchNumber) {
    await expect(this.searchByBatchNumberInput).toBeVisible({ timeout: 10000 });
    await this.searchByBatchNumberInput.fill(batchNumber);
    await this.searchByBatchNumberInput.press('Enter');
  }

  async getFirstOpenBatchId() {
    await expect(this.firstOpenBatchIdElement).toBeVisible({ timeout: 60000 });
    const batchId = await this.firstOpenBatchIdElement.textContent();
    const numericBatchId = batchId ? batchId.match(/\d+/)?.[0] : null;
    return numericBatchId ? numericBatchId.trim() : '';
  }

  async viewBatchTransactions(batchId) {
    const viewButton = this.getViewBatchTransactionsButton(batchId);
    await expect(viewButton).toBeEnabled({ timeout: 30000 });
    const [popupPage] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: 30000 }),
      viewButton.click()
    ]);
    return popupPage;
  }

  async selectLast7DaysDateRange() {
    await expect(this.dateRangeDropdown).toBeVisible({ timeout: 20000 });
    await this.dateRangeDropdown.click();
    await expect(this.last7DaysOption).toBeVisible({ timeout: 20000 });
    await this.last7DaysOption.click();
    await this.page.waitForTimeout(60000); 
  }

}
