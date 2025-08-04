import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click on "Liability"
wait 3 seconds
check that page contains "Print"
*/

test('Gift Report Liability Print', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();

  await expect(giftReportPage.liabilityButton).toBeVisible();
  await giftReportPage.liabilityButton.click(); 

  await expect(giftReportPage.printButton).toBeVisible();
});
