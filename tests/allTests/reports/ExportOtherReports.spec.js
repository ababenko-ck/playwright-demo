import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/* LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
click on "Export" below "Other Reports"
wait 5 seconds
*/

test('Export Other Reports', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.exportOtherReportsButton).toBeVisible();
await reportsPage.exportOtherReportsButton.click({ force: true });
await expect(reportsPage.modalContent).toBeVisible();
await page.waitForTimeout(3000);
await expect(reportsPage.modalContent).not.toBeVisible();
});
