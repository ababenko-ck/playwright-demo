import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click on "Closed Batches"
wait 1 minute
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
  await page.waitForTimeout(60000);
  const invalidBatchNumber = "5555444433331111";
  console.log(`Searching for invalid batch number: ${invalidBatchNumber}`);
  await batchesPage.searchForBatchNumber(invalidBatchNumber);
  await expect(batchesPage.noResultsText).toBeVisible({ timeout: 10000 });

});