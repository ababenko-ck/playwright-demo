import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click on "Open Batches"
wait 1 minute
enter "689" in the "Search by Batch Number"
type enter
wait 3 seconds
check that page does not contain "0 results"
reload
wait 3 seconds
click on "Open Batches" (again, if it reverts to Closed Batches)
enter "5555444433331111" in the "Search by Batch Number"
type enter
verify that "0 results" is visible on the page
*/

test('Open Batches Search Valid and Invalid Numbers', async ({ page }) => {
  test.setTimeout(180000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  await loginPage.login();
  await batchesPage.navigateToOpenBatches();
  await page.waitForTimeout(30000);

  const validBatchNumber = await batchesPage.getFirstOpenBatchId();
  expect(validBatchNumber).not.toBeNull();
  expect(validBatchNumber).not.toBe('');
  await batchesPage.searchForBatchNumber(validBatchNumber);
  await page.waitForTimeout(3000);
  await expect(batchesPage.noResultsText).not.toBeVisible({ timeout: 10000 });
  await page.reload();
  await page.waitForTimeout(3000);
  await batchesPage.navigateToOpenBatches(); 

  const invalidBatchNumber = "5555444433331111"; 
  await batchesPage.searchForBatchNumber(invalidBatchNumber);

  const modalHeading = page.getByRole('heading', { name: 'Invalid Batch Number' });
  await expect(modalHeading).toBeVisible({ timeout: 10000 });

  const referenceText = page.getByText('Reference Number:');
  await expect(referenceText).toBeVisible({ timeout: 5000 });

  const closeButton = page.getByRole('button').nth(1);
  await expect(closeButton).toBeEnabled({ timeout: 5000 }); 
  await closeButton.click();
  await expect(modalHeading).not.toBeVisible({ timeout: 5000 });
});