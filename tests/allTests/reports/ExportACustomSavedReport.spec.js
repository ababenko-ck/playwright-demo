import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/* LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
check that "Custom Saved Reports" is visible on right
click 2nd "download" icon to the right of "New custom report" in "Custom Saved Reports" section
wait 3 seconds
*/

test('Export a Custom Saved Report', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.exportReportButton).toBeVisible();
await reportsPage.exportReportButton.click({ force: true });
await page.waitForTimeout(3000);
});
