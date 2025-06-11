import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/*LoginRebrand
click on "Reports" page
wait 5 seconds
check that page contains text "Reports"
wait 3 seconds
click on "View" button inside the "Custom Saved Reports" section
wait 5 seconds*/

test('View a Customer Saved Reports', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);
  const transactionsPage = new TransactionsPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.login();

  await dashboardPage.navigateToReports();
  await expect(reportsPage.reportsHeading).toBeVisible();
  await reportsPage.viewReportButton.click();
  await transactionsPage.verifyTransactionsHeading();
});
