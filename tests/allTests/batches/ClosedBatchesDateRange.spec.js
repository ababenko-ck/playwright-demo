import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';

/*
LoginRebrand
click on "Batches" page
click on "Closed Batches"
click on "Last 30 Days" dropdown
click on "Last 7 Days"
verify that the selected date range is displayed (e.g., "Last 7 Days")
*/

test('Closed Batches Date Range Selection - Last 7 Days', async ({ page }) => {
  test.setTimeout(180000); 

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  
  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();
  await batchesPage.selectLast7DaysDateRange();

});
