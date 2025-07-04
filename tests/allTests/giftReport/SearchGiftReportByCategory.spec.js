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
click on "Last 90 Days"
click on "Last 90 Days"
wait 2 seconds
click "All" if page contains "All"
wait 3 seconds
*/

test('Search Gift report by category', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);
  const transactionsPage = new TransactionsPage(page);
  const dashboardPage = new DashboardPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();
  await giftReportPage.last90DaysText.click();
  await giftReportPage.last90DaysListItem.click({ force: true });

  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  
    if (await giftReportPage.allButton.isVisible()) {
    await giftReportPage.allButton.waitFor({ state: 'visible' });
    await giftReportPage.allButton.click({ force: true });
  } else {
    await expect(giftReportPage.emptyStateTitle).toHaveText('0 Results');
  }
});
