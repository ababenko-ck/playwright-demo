import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import { RecurringSchedulesPage } from '../../pages/recurringSchedulesPage.js';
import { generateUniqueLastName, generateFutureExpirationDate, generateUniqueAmount } from '../../pages/Generator';
import authData from '../../data/auth';

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
  test.setTimeout(45000); 

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const recurringSchedulesPage = new RecurringSchedulesPage(page);

  const uniqueFirstName = generateUniqueLastName();
  const testCard1 = authData.testCards.testCard1;
  const futureExpDate = generateFutureExpirationDate();
  const uniqueAmount = generateUniqueAmount();

  await loginPage.login();
  await dashboardPage.navigateToRecurringSchedules();
  await dashboardPage.waitForPageToLoad();

  await expect(recurringSchedulesPage.recurringHeading).toBeVisible();
  await expect(recurringSchedulesPage.newCustomerButton).toBeVisible();
  await recurringSchedulesPage.newCustomerButton.click();

  await expect(recurringSchedulesPage.modal).toBeVisible();
  await expect(recurringSchedulesPage.maximazeButton).toBeVisible();  
  await recurringSchedulesPage.maximazeButton.click();

  await expect(recurringSchedulesPage.firstNameTexbox).toBeVisible();
  await recurringSchedulesPage.firstNameTexbox.fill(uniqueFirstName);

  await expect(recurringSchedulesPage.paymentMethod).toBeVisible();
  await recurringSchedulesPage.paymentMethod.click();

  await expect(recurringSchedulesPage.cardNumberInput).toBeVisible();
  await recurringSchedulesPage.cardNumberInput.fill(testCard1);

  await expect(recurringSchedulesPage.transactionExpDate).toBeVisible();
  await recurringSchedulesPage.transactionExpDate.fill(futureExpDate);

  await expect(recurringSchedulesPage.recurringSchedule).toBeVisible();
  await recurringSchedulesPage.recurringSchedule.click();

  await expect(recurringSchedulesPage.amountTextFieldByRole).toBeVisible();
  await recurringSchedulesPage.amountTextFieldByRole.fill(uniqueAmount);

  await recurringSchedulesPage.customerScheduleDropdown.click();
  await page.keyboard.type('Test');

  await page.mouse.wheel(0, 1000);

  await expect(recurringSchedulesPage.neverCheckboxLabelModal).toBeVisible();
  await recurringSchedulesPage.neverCheckboxLabelModal.click();

  await expect(recurringSchedulesPage.saveButton).toBeVisible();
  await recurringSchedulesPage.saveButton.click();

  await expect(recurringSchedulesPage.customerCreatedModal).toContainText('Customer created', { timeout: 15000 });

  await expect(recurringSchedulesPage.viewCustomerLink).toBeVisible();
  await recurringSchedulesPage.viewCustomerLink.click();

  await page.waitForTimeout(3000);
});
