import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import { RecurringSchedulesPage } from '../../pages/recurringSchedulesPage.js';
import { waitForDebugger } from 'inspector';

/* LoginRebrand
click "Recurring Schedules"
click "Templates"
wait 5 seconds
click "New Template"
enter "test33" into "Schedule name" roughly below the "*"
enter "3" into "0"
enter "$4" into "$0"
click "Frequency" roughly above the "EVERY"
click "0"
click "Save"
click on "close"
wait 3 seconds
click on "icon--delete"
click on button "Delete"
click on "Close"
*/

test('Delete and create new Recurring Template', async ({ page }) => {
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);
const recurringSchedulesPage = new RecurringSchedulesPage(page);

await loginPage.login();
await dashboardPage.navigateToRecurringSchedules();
await dashboardPage.waitForPageToLoad();
await expect(recurringSchedulesPage.recurringHeading).toBeVisible();


});
