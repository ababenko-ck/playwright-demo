import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click on "Closed Batches"
wait 2 minutes
verify that "View batch transactions" is visible on the page
hover over "View batch transactions"
click on button with tooltip "View batch transactions"
wait 5 seconds
verify that text "Batch" is visible on the page
*/

test('Closed Batches View Batch Transactions', async ({ page }) => {
  test.setTimeout(240000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();

  const firstBatchId = await batchesPage.getFirstOpenBatchId();
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  const transactionsPage = await batchesPage.viewBatchTransactions(firstBatchId);
  await transactionsPage.waitForLoadState('load', { timeout: 30000 });
  await transactionsPage.waitForTimeout(5000);
  await expect(batchesPage.transactionsHeading(transactionsPage)).toBeVisible({ timeout: 10000 });
  await expect(transactionsPage.locator('p.type--title.type--ellipsis', { hasText: 'Batch' })).toBeVisible({ timeout: 10000 });
});
