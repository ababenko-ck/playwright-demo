import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 1 minute (replaced by dynamic wait)
click on "Closed Batches" (if not default)
wait 1 minute (replaced by dynamic wait)
click on "Print"
wait 3 seconds
*/

test('Closed Batches Print', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);

  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();
  console.log('Relying on dynamic waiting for batch data to load before print...');
  const firstBatchId = await batchesPage.getFirstOpenBatchId(); 
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  console.log(`First batch ID found: ${firstBatchId}. Data should be loaded.`);
  await batchesPage.clickPrintButton();
  await page.waitForTimeout(3000);

  console.log('The print button has been clicked and waits are complete. The system print dialog is open.');
});
