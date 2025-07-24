import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DisputesPage } from '../../pages/disputesPage';

/*LoginRebrand
click on "Disputes" page
wait 3 seconds
check that page contains text "Disputes"
click on "Last 7 Days"
click exactly "Custom"
enter "01/16/2022" near "Start Date"
wait 2 seconds
enter "01/18/2022" near "End Date"
click on the button "Apply"
wait 3 seconds
*/

test('Functionality of date range on Disputes grid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const disputesPage = new DisputesPage(page);

  await loginPage.login();
  await disputesPage.disputesLink.click();

  await disputesPage.waitForPageToLoad();
 
  await expect(disputesPage.DisputesHeading).toBeVisible();

  await page.waitForTimeout(3000);

  await disputesPage.addFilterButton.click();
  await disputesPage.cardNumberFilter.click();
  await disputesPage.last4DigitsInput.fill('1111_');
  await disputesPage.transactionAmountFilter.last().click();
  await disputesPage.transactionAmountInput.fill('1');

  await page.waitForTimeout(3000); 
  await expect(disputesPage.doneButton).toBeVisible();
  await disputesPage.doneButton.click({ force: true });

  await page.waitForTimeout(3000); 
  await expect(disputesPage.selectedCardNumberFilter).toBeVisible();
  await expect(disputesPage.selectedTransactionAmountFilter).toBeVisible();
});
