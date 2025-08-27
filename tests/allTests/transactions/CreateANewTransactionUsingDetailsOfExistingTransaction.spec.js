import { test, expect } from '@playwright/test';
import { TransactionsPage } from '../../pages/transactionsPage';  
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';
import { generateUniqueAmount } from '../../pages/Generator';

/*LoginRebrand
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click below "Command"
wait 3 seconds
verify that "GENERAL INFORMATION" is visible
click on "New Transaction"
wait 3 seconds
check that page contains text "Add new transaction"
wait 3 seconds
generateRandomAmount
enter from stored value "randomAmount" into the input below "Amount" label
wait 3 seconds
click input "XXXX"
enter "5555444433331111"
wait 3 seconds
enter "01/28" near "Exp Date"
wait 3 seconds
click "Process" button
wait 5 seconds
Rebrand Validate transaction processed
*/

test('Create a new transaction using details of existing transaction', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  const transactionsPage = new TransactionsPage(page);
  const uniqueAmount = generateUniqueAmount();
  
  await loginPage.login();

  await transactionsPage.transactionsLink.click();
  await transactionsPage.verifyTransactionsHeading();
  await transactionsPage.filterCustomersByCardholderName();

  await transactionsPage.clickFirstTransactionInGrid();
  await expect(transactionsPage.generalInformationButton).toBeVisible();
  await transactionsPage.sidebarNewTransactionButton.click();
  await expect(transactionsPage.addNewTransactionHeading).toBeVisible();
  await addANewCustomerPage.createNewTransactionFromExistingCustomerWithCard(uniqueAmount);

});
