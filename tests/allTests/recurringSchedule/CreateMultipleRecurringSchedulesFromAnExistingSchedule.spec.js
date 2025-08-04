import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import { RecurringSchedulesPage } from '../../pages/recurringSchedulesPage.js';
import { waitForDebugger } from 'inspector';

/* LoginRebrand
click "Recurring Schedules"
scroll up on "app"
click "New Customer"
scroll down on "app"
click on button "Maximize view"
click "First Name"
enter "test456" into "First Name"
click "Payment Method"
enter "5555 4444 3333 1111" into "XXXX XXXX XXXX XXXX"
enter "01/28" into "MM/YY"
click "Recurring Schedule"
enter "Test"  into "Schedule name"
generateRandomAmount
enter from stored value "randomAmount" into the input below "Amount" label
scroll down until page contains "Never"
click "Never"
click "Save"
click "View customer"
wait 3 seconds
click "Payments"
click "Schedule"
click "History"
*/

test('Create new Recurring Schedule', async ({ page }) => {
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);
const recurringSchedulesPage = new RecurringSchedulesPage(page);

await loginPage.login();
await dashboardPage.navigateToRecurringSchedules();
await dashboardPage.waitForPageToLoad();
await expect(recurringSchedulesPage.recurringHeading).toBeVisible();

await expect(recurringSchedulesPage.recurringHeading).toBeVisible();
await recurringSchedulesPage.newCustomerButton.click();
await page.waitForTimeout(3000);

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.maximazeButton).toBeVisible();  
await recurringSchedulesPage.maximazeButton.click();
});
