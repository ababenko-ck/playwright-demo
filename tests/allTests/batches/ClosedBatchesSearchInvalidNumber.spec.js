import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click on "Closed Batches"
wait 1 minute (replaced by dynamic wait)
enter "5555444433331111" in the "Search by Batch Number"
type enter
verify that "0 results" is visible on the page
*/

test('Closed Batches Search Invalid Number', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();

  const firstBatchId = await batchesPage.getFirstOpenBatchId();
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  const invalidBatchNumber = "5555444433331111";
  await batchesPage.searchForBatchNumber(invalidBatchNumber);
  await expect(batchesPage.noResultsText).toBeVisible({ timeout: 10000 });
});
