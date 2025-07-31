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
  console.log('Relying on dynamic waiting for batch data to load before search...');
  const firstBatchId = await batchesPage.getFirstOpenBatchId();
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  console.log(`First batch ID found: ${firstBatchId}. Data should be loaded.`);
  const invalidBatchNumber = "5555444433331111";
  console.log(`Searching for invalid batch number: ${invalidBatchNumber}`);
  await batchesPage.searchForBatchNumber(invalidBatchNumber);
  await expect(batchesPage.noResultsText).toBeVisible({ timeout: 10000 });

  console.log('Invalid batch number search completed and "0 results" verified.');
});
