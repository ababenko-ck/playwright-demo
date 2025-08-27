import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';

/* LoginRebrand
click on "Reports" page
wait 3 seconds
check that page contains text "Reports"
click on "Advance filters"
click on label "Amount"
enter "2" in the "Amount"
click on label "Card Number"
enter "1111" in the "Last 4 Digits"
click on label "Cardholder Name"
enter "Test" in the "Cardholder Name"
click on label "Card Type"
click checkbox "Visa"
click on label "Custom Fields"
enter "1" in the "Custom01"
enter "2" in the "Custom02"
enter "3" in the "Custom03"
click on "Save Report"
wait 3 seconds
click on input "customReportName"
enter "New custom report"
click on "Save"
wait 3 seconds
click on "close"
wait 3 seconds
click on "Hide advance filters"
*/

test('Validate Report Filters with Save Report', async ({ page }) => {
const loginPage = new LoginPage(page);
const reportsPage = new ReportsPage(page);
const transactionsPage = new TransactionsPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.login();
await dashboardPage.navigateToReports();
await reportsPage.waitForPageToLoad();
await expect(reportsPage.reportsHeading).toBeVisible();

await expect(reportsPage.advanceFiltersLink).toBeVisible();
await reportsPage.advanceFiltersLink.click();

await expect(reportsPage.amountLabel).toBeVisible();
await reportsPage.amountLabel.click();

await expect(reportsPage.amountInput).toBeVisible();
await reportsPage.amountInput.fill('2');

await expect(reportsPage.cardNumberLabel).toBeVisible();
await reportsPage.cardNumberLabel.click();

await expect(reportsPage.cardNumberInput).toBeVisible();
await reportsPage.cardNumberInput.fill('1111');

await expect(reportsPage.cardholderNameLabel).toBeVisible();
await reportsPage.cardholderNameLabel.click();

await expect(reportsPage.cardholderNameInput).toBeVisible();
await reportsPage.cardholderNameInput.fill('Test');

await expect(reportsPage.cardTypeLabel).toBeVisible();
await reportsPage.cardTypeLabel.click();
await expect(reportsPage.cardTypeVisaLabel).toBeVisible();
await reportsPage.cardTypeVisaLabel.click();  

await expect(reportsPage.customFieldsLabel).toBeVisible();
await reportsPage.customFieldsLabel.click();
await expect(reportsPage.customField01).toBeVisible();
await reportsPage.customField01.fill('1');
await expect(reportsPage.customField02).toBeVisible();
await reportsPage.customField02.fill('2');
await expect(reportsPage.customField03).toBeVisible();
await reportsPage.customField03.fill('3');      

await expect(reportsPage.saveReportButton).toBeVisible();
await reportsPage.saveReportButton.click();

await expect(reportsPage.reactModal).toBeVisible();
await expect(reportsPage.reactModalHeader).toHaveText('Custom Saved Report');
await reportsPage.reactModalInput.click();
await reportsPage.reactModalInput.fill('New custom report');
await reportsPage.reactModalButton.click();
await expect(reportsPage.reactModal).not.toBeVisible();

await expect(reportsPage.modalContent).toBeVisible();
await expect(reportsPage.modalHeader).toBeVisible();
await reportsPage.modalButtonX.click();
await expect(reportsPage.modalContent).not.toBeVisible();

await expect(reportsPage.hideAdvanceFiltersLink).toBeVisible();
await reportsPage.hideAdvanceFiltersLink.click();

await expect(reportsPage.advanceFiltersLink).toBeVisible();
await expect(reportsPage.hideAdvanceFiltersLink).not.toBeVisible();
});
