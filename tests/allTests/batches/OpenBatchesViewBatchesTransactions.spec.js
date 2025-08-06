import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click on "Open Batches"
wait 20 seconds
//grab value from XPath "/html/body/div[1]/div/div[1]/div/div/div[3]/table/tbody/tr/td[1]/button" and save it as "xBatchButton"
//extract value by regex "\d+" from saved value "xBatchButton" and save it as "xBatchID"
//save expression "view-batch-transactions-button-${xBatchID}" as "viewBatchTransaction"
//click "viewBatchTransaction"
click "view-batch-transactions-button"
wait 10 seconds
verify that text "Batch" is visible on the page
*/

test('Open Batches View Batch Transactions', async ({ page }) => {
  test.setTimeout(240000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  await loginPage.login();
  await batchesPage.navigateToOpenBatches();

  const firstBatchId = await batchesPage.getFirstOpenBatchId();
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  
  const transactionsPage = await batchesPage.viewBatchTransactions(firstBatchId);
  await transactionsPage.waitForLoadState('load', { timeout: 30000 });
  await transactionsPage.waitForTimeout(5000);
  await expect(batchesPage.transactionsHeading(transactionsPage)).toBeVisible({ timeout: 10000 });
  await expect(transactionsPage.locator('p.type--title.type--ellipsis', { hasText: 'Batch' })).toBeVisible({ timeout: 10000 });
});