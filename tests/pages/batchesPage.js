import { expect } from '@playwright/test';
import Locator from '../helpers/Locator';

export class BatchesPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.batchesLink = this.locator.getByRoleName('link','Batches');
    this.openBatchesButton = this.locator.getByRoleName('button', 'Open Batches');
    this.closedBatchesButton = this.locator.getByRoleName('button', 'Closed Batches');
    this.showSummaryButton = this.locator.getByRoleName('button','Show Summary');
    this.breakdownByCardText = this.locator.getByText('Breakdown by Card');
    this.exportButton = this.locator.getByRoleName('button', 'Export');
    this.printButton = this.locator.getByRoleName('button', 'Print');
    this.saleSummaryText = this.locator.getByText('SALE SUMMARY BY CARD TYPE');
    this.creditSummaryText = this.locator.getByText('CREDIT SUMMARY BY CARD TYPE');
    this.batchSummaryText = this.locator.getByText('Batch Summary');
    this.countText = page.locator('.pie-chart-text.count');
    this.openBatchesLoaded = this.locator.getByRoleName('button', 'ID #');
    this.searchByBatchNumberInput = page.getByPlaceholder('Search by Batch Number');
    this.noResultsText = this.locator.getByText('0 results');
    this.firstOpenBatchIdElement = page.locator('div.flex--primary.type--wgt--medium').first();
    this.getViewBatchTransactionsButton = (batchId) => page.getByTestId(`view-batch-transactions-button-${batchId}`);
    this.transactionsHeading = (pageContext) => pageContext.getByRole('heading',  'Transactions');
    this.dateRangeDropdown = this.locator.getByText('Last 30 Days'); 
    this.last7DaysOption = this.locator.getByRoleName('menuitem', 'Last 7 Days'); 
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
