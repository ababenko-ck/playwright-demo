import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';
import { generateFutureExpirationDate, generateUniqueAmount } from '../../pages/Generator';
import authData from '../../data/auth';
import { TransactionsPage } from '../../pages/transactionsPage';
import { waitForDebugger } from 'inspector';

/*LoginRebrand
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click on "New Transaction" button
wait 2 seconds
check that page contains text "Add new transaction"
select "Save"
wait 3 seconds
enter "5555444433331111" near "Card Number"
wait 3 seconds
enter "01/28" near "Exp Date"
wait 3 seconds
add ZIP (required)
click "Process" button
wait 5 seconds
Close the modal
*/

test('Create a new transaction with CC transaction type Save', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage= new TransactionsPage(page);
  const futureExpDate = generateFutureExpirationDate();
  const uniqueAmount = generateUniqueAmount();
  const testCard1 = authData.testCards.testCard1;
  const option = "Save";

  await loginPage.login();
  await transactionsPage.navigateToTransactions();
  await transactionsPage.waitForPageToLoad();
  await transactionsPage.newTransactionButton.click();
  await expect(transactionsPage.addNewTransactionHeading).toBeVisible();

  await transactionsPage.createNewTransactionByType(uniqueAmount, futureExpDate, testCard1, option);
  await expect(transactionsPage.dialogXButton).toBeVisible();
  await transactionsPage.dialogXButton.click();
});
