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

test('Open Batches Verify Created Transactions', async ({ page }) => {
  test.setTimeout(180000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);

  await loginPage.login();
  await batchesPage.navigateToOpenBatches();
  console.log('Navigated to Open Batches and data loaded.');
  await batchesPage.showSummary();
  console.log('Clicked "Show Summary".');
  console.log('Verifying presence of key text elements...');
  await expect(page.getByText('Breakdown by Card')).toBeVisible({ timeout: 10000 });
  console.log('"Breakdown by Card" is visible.');
  await expect(batchesPage.exportButton).toBeVisible({ timeout: 10000 });
  console.log('"Export" button is visible.');
  await expect(batchesPage.printButton).toBeVisible({ timeout: 10000 });
  console.log('"Print" button is visible.');
  await expect(batchesPage.saleSummaryText).toBeVisible({ timeout: 10000 });
  console.log('"SALE SUMMARY BY CARD TYPE" is visible.');
  await expect(batchesPage.creditSummaryText).toBeVisible({ timeout: 10000 });
  console.log('"CREDIT SUMMARY BY CARD TYPE" is visible.');
  await expect(batchesPage.batchSummaryText).toBeVisible({ timeout: 10000 });
  console.log('"Batch Summary" is visible.');
  await expect(batchesPage.countText.first()).toBeVisible({ timeout: 10000 });
  console.log('"count" text is visible.');

  console.log('The "Open Batches Verify Created Transactions" test completed successfully.');
});
