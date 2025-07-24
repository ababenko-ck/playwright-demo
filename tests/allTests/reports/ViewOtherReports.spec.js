import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/*LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
click on "View" below "Other Reports"
wait 5 seconds
verify that text "Transactions" is visible on page*/

test('View Other Reports', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);
  const transactionsPage = new TransactionsPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.login();

  await dashboardPage.navigateToReports();
  await dashboardPage.waitForPageToLoad();
  await expect(reportsPage.reportsHeading).toBeVisible();

  await expect(reportsPage.otherReportsViewIcon).toBeVisible();
  await reportsPage.otherReportsViewIcon.click();

  await transactionsPage.waitForPageToLoad();
  await expect(transactionsPage.transactionTable).toBeVisible();
});
