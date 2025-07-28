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
click on button "Export"
wait 3 seconds
*/

test('Export pre-saved Report', async ({ page }) => {
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
await expect(reportsPage.exportButton).toBeVisible();
await reportsPage.exportButton.click();
});
