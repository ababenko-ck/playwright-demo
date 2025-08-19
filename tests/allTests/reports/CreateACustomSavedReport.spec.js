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
click on "Sale"
click on "Capture"
click on "Refund"
click on "Credit"
click on "Select..."
click on "Approved"
click on button "Save Report"
wait 3 seconds
verify that "Custom Saved Report" text is visible
click on input "customReportName"
enter "New custom report"
click on "Save"
wait 3 seconds
click on "close"
*/

test('Create a Custom Saved Report', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const transactionsPage = new TransactionsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.transactionTypeInput).toBeVisible();
await reportsPage.transactionTypeInput.click({ force: true });
await expect(reportsPage.transactionTypeDropDown).toBeVisible();
await reportsPage.transactionTypeDropDown.getByText('Sale').click();
await reportsPage.transactionTypeDropDown.getByText('Capture').click();
await reportsPage.transactionTypeDropDown.getByText('Refund').click();
await reportsPage.transactionTypeDropDown.getByText('Credit').click();
await expect(reportsPage.transactionTypeListedValues).toHaveText('SaleCaptureRefundCredit');

await reportsPage.transactionStatusInput.click({ force: true });
await expect(reportsPage.transactionTypeDropDown).toBeVisible();
await reportsPage.transactionTypeDropDown.getByText('Approved').click();
await reportsPage.transactionStatusListedValue.getByText('Approved').click();
await expect(reportsPage.saveReportButton).toBeVisible();
await reportsPage.saveReportButton.click();

await page.waitForTimeout(3000);
await expect(reportsPage.reactModal).toBeVisible();
await expect(reportsPage.reactModalHeader).toHaveText('Custom Saved Report');
await reportsPage.reactModalInput.click();
await reportsPage.reactModalInput.fill('New custom report');
await reportsPage.reactModalButton.click();
await expect(reportsPage.reactModal).not.toBeVisible();

await page.waitForTimeout(3000);
await expect(reportsPage.modalContent).toBeVisible();
await expect(reportsPage.modalHeader).toBeVisible();
await reportsPage.modalButtonX.click();
await expect(reportsPage.modalContent).not.toBeVisible();

});
