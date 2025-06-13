import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click "Add filter"
click "Gift card number"
enter "6900669198836942"
click "Submit"
wait 3 seconds
verify that "0 Results" text is visible on the page
*/

test(' Search functionality with Valid Gift Card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);
  const transactionsPage = new TransactionsPage(page);
  const dashboardPage = new DashboardPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();
  
  await expect(page.getByRole('listitem').filter({ hasText: 'Add Filter' }).locator('div')).toBeVisible();
  await page.getByText('Add Filter').click();
  await page.getByText('Gift card number', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Gift Card number' }).click();
  await page.getByRole('textbox', { name: 'Gift Card number' }).fill('6900669198836942');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('0 Results')).toBeVisible();
  await expect(page.getByText('You should change your filter')).toBeVisible();
});
