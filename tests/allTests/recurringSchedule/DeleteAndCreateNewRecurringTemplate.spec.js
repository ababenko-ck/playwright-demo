import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import { RecurringSchedulesPage } from '../../pages/recurringSchedulesPage.js';
import { generateUniqueAmount, generateUniqueLastName} from '../../pages/Generator';

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
test.setTimeout(30000);

const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);
const recurringSchedulesPage = new RecurringSchedulesPage(page);
const uniqueAmount = generateUniqueAmount();
const uniqueString = generateUniqueLastName();

await loginPage.login();
await dashboardPage.navigateToRecurringSchedules();
await dashboardPage.waitForPageToLoad();
await expect(recurringSchedulesPage.recurringHeading).toBeVisible();
await expect(recurringSchedulesPage.templatesTab).toBeVisible();
await recurringSchedulesPage.templatesTab.click();
await page.waitForTimeout(3000); 

await expect(recurringSchedulesPage.newCustomerButton).toBeVisible();
await recurringSchedulesPage.newCustomerButton.click();
await page.waitForTimeout(3000);

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.scheduleNameInput).toBeVisible();
await recurringSchedulesPage.scheduleNameInput.fill('test' + uniqueString);
await expect(recurringSchedulesPage.amountInput).toBeVisible();
await recurringSchedulesPage.amountInput.fill(uniqueAmount);
await expect(recurringSchedulesPage.saveButtonTemplate).toBeVisible();
await recurringSchedulesPage.saveButtonTemplate.click();

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.modal).toContainText('Template saved');
await expect(recurringSchedulesPage.modal).toContainText('Reference Number', { substring: true });
await expect(recurringSchedulesPage.xButton).toBeVisible();
await recurringSchedulesPage.xButton.click();
await page.waitForTimeout(3000);

await expect(recurringSchedulesPage.deleteTemplateButton).toBeVisible();
await recurringSchedulesPage.deleteTemplateButton.click();
await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.modal).toContainText('Delete template');
await expect(recurringSchedulesPage.modal).toContainText('Are you sure you want to delete');
await expect(recurringSchedulesPage.deleteButtonTemplate).toBeVisible();
await recurringSchedulesPage.deleteButtonTemplate.click();  
await page.waitForTimeout(3000);

await expect(recurringSchedulesPage.modal).toBeVisible();
await expect(recurringSchedulesPage.modal).toContainText('Template removed');
await expect(recurringSchedulesPage.modal).toContainText('Reference Number', { substring: true });
await expect(recurringSchedulesPage.xButton).toBeVisible();
await recurringSchedulesPage.xButton.click();
});
