import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click "Open Batches"
wait 1 minute
click "Show Summary"
check that the page contains "Breakdown by Card"
check that the page contains "Export"
check that the page contains "Print"
check that the page contains "SALE SUMMARY BY CARD TYPE"
check that the page contains "CREDIT SUMMARY BY CARD TYPE"
check that the page contains "Batch Summary"
check that the page contains "count"
*/

test('Open Batches UI Validation', async ({ page }) => {
  test.setTimeout(90000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page); 
  await loginPage.login();
  await batchesPage.navigateToOpenBatches(); 
  await batchesPage.showSummary();
  await expect(batchesPage.breakdownByCardText).toBeVisible();
  await expect(batchesPage.exportButton).toBeVisible();
  await expect(batchesPage.printButton).toBeVisible();
  await expect(batchesPage.saleSummaryText).toBeVisible();
  await expect(batchesPage.creditSummaryText).toBeVisible();
  await expect(batchesPage.batchSummaryText).toBeVisible();
  await expect(batchesPage.countText.first()).toBeVisible();
});