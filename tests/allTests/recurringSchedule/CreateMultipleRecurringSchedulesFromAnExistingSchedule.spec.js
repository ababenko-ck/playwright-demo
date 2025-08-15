import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import { RecurringSchedulesPage } from '../../pages/recurringSchedulesPage.js';
import { generateUniqueAmount, generateUniqueLastName} from '../../pages/Generator';

/* LoginRebrand
click "Recurring Schedules"
wait 10 seconds
click below "Recurring ID"
click "Add Schedule"
enter "test555" in "Schedule name"
enter "$4" into "$0"
click "Save"
wait 5 seconds
click "Close"
scroll down
click "Add Schedule"
enter "test1" in "Schedule name"
enter "$3" into "$0"
click "Save"
wait 10 seconds
click "Close"
*/

test('Create multiple recurring schedules from an existing schedule', async ({ page }) => {
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);
const recurringSchedulesPage = new RecurringSchedulesPage(page);
const uniqueAmount1 = generateUniqueAmount();
const uniqueAmount2 = generateUniqueAmount();
const uniqueString = generateUniqueLastName();

await loginPage.login();
await dashboardPage.navigateToRecurringSchedules();
await dashboardPage.waitForPageToLoad();
await expect(recurringSchedulesPage.recurringHeading).toBeVisible();

await expect(recurringSchedulesPage.firstExistingRecurringSchedule).toBeVisible();
await recurringSchedulesPage.firstExistingRecurringSchedule.click();

//Create first schedule
await expect(recurringSchedulesPage.sidebar).toBeVisible();
await expect(recurringSchedulesPage.addScheduleButtonSidebar).toBeVisible();
await recurringSchedulesPage.addScheduleButtonSidebar.click();
await expect(recurringSchedulesPage.scheduleNameFieldSidebar).toBeVisible();
await recurringSchedulesPage.scheduleNameFieldSidebar.fill('test' + uniqueString);
await expect(recurringSchedulesPage.amountTextFieldSidebar).toBeVisible();
await recurringSchedulesPage.amountTextFieldSidebar.fill(uniqueAmount1);
await recurringSchedulesPage.numberOfPaymentsCheckbox.click();
await expect(recurringSchedulesPage.totalPaymentsField).toBeVisible();
await recurringSchedulesPage.totalPaymentsField.fill('1');
await recurringSchedulesPage.saveButtonSidebar.click();
await page.waitForTimeout(4000); 

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.modal).toContainText('Recurring schedule updated');
await expect(recurringSchedulesPage.xButton).toBeVisible();
await recurringSchedulesPage.xButton.click();
await page.waitForTimeout(3000);

//Create second schedule
await expect(recurringSchedulesPage.sidebar).toBeVisible();
await expect(recurringSchedulesPage.addScheduleButtonSidebar).toBeVisible();
await recurringSchedulesPage.addScheduleButtonSidebar.click();
await expect(recurringSchedulesPage.scheduleNameFieldSidebar).toBeVisible();
await recurringSchedulesPage.scheduleNameFieldSidebar.fill('test' + uniqueString);
await expect(recurringSchedulesPage.amountTextFieldSidebar).toBeVisible();
await recurringSchedulesPage.amountTextFieldSidebar.fill(uniqueAmount2);
await recurringSchedulesPage.numberOfPaymentsCheckbox.click();
await expect(recurringSchedulesPage.totalPaymentsField).toBeVisible();
await recurringSchedulesPage.totalPaymentsField.fill('1');
await recurringSchedulesPage.saveButtonSidebar.click();
await page.waitForTimeout(4000); 

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.modal).toContainText('Recurring schedule updated');
await expect(recurringSchedulesPage.xButton).toBeVisible();
await recurringSchedulesPage.xButton.click();
await page.waitForTimeout(3000);
});
