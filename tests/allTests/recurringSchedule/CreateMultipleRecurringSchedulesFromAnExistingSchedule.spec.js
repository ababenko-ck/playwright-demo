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

test('Create two new schedules inside existing recurring schedule', async ({ page }) => {
test.setTimeout(60000); 
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const recurringSchedulesPage = new RecurringSchedulesPage(page);

  const uniqueAmount1 = generateUniqueAmount();
  const uniqueAmount2 = generateUniqueAmount();
  const uniqueString = generateUniqueLastName();

  await loginPage.login();

  await dashboardPage.navigateToRecurringSchedules();
  await recurringSchedulesPage.waitForPageToLoad();
  await expect(recurringSchedulesPage.recurringHeading).toBeVisible();

  await expect(recurringSchedulesPage.firstExistingRecurringSchedule).toBeVisible();
  await recurringSchedulesPage.firstExistingRecurringSchedule.click();

  await recurringSchedulesPage.createSchedule('test1_' + uniqueString, uniqueAmount1);
  await recurringSchedulesPage.createSchedule('test2_' + uniqueString, uniqueAmount2);
});