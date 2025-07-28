import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/* LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
click on "Edit" button inside the "Custom Saved Reports" section
wait 3 seconds
click "Invoice"
enter "Invoice"
scroll down
click on button "Save Report"
click on "Save As New"
wait 3 seconds
click on "close"
wait 3 seconds
*/

test('Edit a Custom Saved Report', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.editReportButton).toBeVisible();
await reportsPage.editReportButton.click({ force: true });
await page.waitForTimeout(3000);
await reportsPage.invoiceLabel.click({ force: true });

await expect(reportsPage.invoiceTextbox).toBeVisible();    
await reportsPage.invoiceTextbox.click();
await reportsPage.invoiceTextbox.fill('Invoice');

await expect(reportsPage.saveReportButton).toBeVisible();    
await reportsPage.saveReportButton.click();

await expect(reportsPage.modalContent).toBeVisible(); 
await expect(reportsPage.modalHeaderConfirm).toContainText('Custom Saved Report');

await expect(reportsPage.modalButtonSaveAsNew).toBeVisible(); 
await reportsPage.modalButtonSaveAsNew.click();
await expect(reportsPage.modalContent).not.toBeVisible();
});
