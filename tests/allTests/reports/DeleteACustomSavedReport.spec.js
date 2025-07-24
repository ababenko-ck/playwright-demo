import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/* LLoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
wait 3 seconds
click on the second "Delete" button
wait 3 seconds
click on "Delete report"
wait 5 seconds
click on "close"
*/

test('Delete a Custom Saved Report', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.deleteReportButton).toBeVisible();
await reportsPage.deleteReportButton.click({ force: true });
await page.waitForTimeout(3000);

await expect(reportsPage.modalHeaderConfirm).toBeVisible();
await expect(reportsPage.modalHeaderConfirm).toHaveText('Confirm Report Deletion');
await expect(reportsPage.modalButtonDelete).toBeVisible();
await reportsPage.modalButtonDelete.click(); 
await page.waitForTimeout(3000);

await expect(reportsPage.modalContent).toBeVisible();
await reportsPage.modalButtonX.click();
await expect(reportsPage.modalContent).not.toBeVisible();
});
