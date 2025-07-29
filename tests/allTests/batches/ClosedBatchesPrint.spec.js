import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
wait 1 minute
click on "Closed Batches" (if not default)
wait 1 minute
click on "Print"
wait 3 seconds
*/

test('Closed Batches Print', async ({ page }) => {
  test.setTimeout(120000); 

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);

  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();
  await page.waitForTimeout(60000); 
  await batchesPage.clickPrintButton();
  await page.waitForTimeout(3000);

  console.log('Gumb za ispis je kliknut i čekanja su dovršena. Otvoren je dijalog za ispis sustava.');
});
