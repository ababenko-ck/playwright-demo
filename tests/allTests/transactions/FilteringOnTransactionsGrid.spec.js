import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TransactionsPage } from '../../pages/transactionsPage';

/*LoginRebrand
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click on "Add Filter"
click on "Card Number"
enter "1111" into "Last 4 digits"
click on "Done"
wait 3 seconds
verify that "Transactions" page is visible
*/

test('Filtering on Transactions grid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage = new TransactionsPage(page);

  await loginPage.login();
  await transactionsPage.navigateToTransactions();
  await transactionsPage.waitForPageToLoad();

  await transactionsPage.addFilterButton.click();
  await transactionsPage.cardNumberOption.click();
  await transactionsPage.cardNumberTexbox.fill('1111');
  await transactionsPage.SubmitButton.click();
  await transactionsPage.waitForPageToLoad();

  await expect(transactionsPage.transactionTable).toBeVisible();
});
