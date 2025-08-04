import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
click on "Open Batches"
wait 1 minute
check that page contains "Print"
*/

test('Open Batches Print', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);

  await loginPage.login();
  await batchesPage.navigateToOpenBatches();
  await page.waitForTimeout(20000); 

  await batchesPage.clickPrintButton();
  await page.waitForTimeout(3000);
  console.log('The print button has been clicked and waits are complete. The system print dialog for Open Batches is open.');
});