import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
/* LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
click on "Select..."
click "All" if page contains "All"
click "View Report"
wait 3 seconds
verify that "Transactions" page is visible
*/

test('Validate UI Reports and View Approved Reports', async ({ page }) => {
 const loginPage = new LoginPage(page);
  const reportsPage = new ReportsPage(page);
  const transactionsPage = new TransactionsPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.login();

await dashboardPage.navigateToReports();
await expect(reportsPage.reportsHeading).toBeVisible();
await reportsPage.reportTypeDropdown.click();
await reportsPage.allTextOption.click();
await reportsPage.reportsHeading.click();
await reportsPage.viewReportButton.click();
await transactionsPage.verifyTransactionsHeading();
});
