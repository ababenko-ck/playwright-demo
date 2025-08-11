import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TransactionsPage } from '../../pages/transactionsPage';
import { generateUniqueAmount, generateFutureExpirationDate } from '../../pages/Generator';
import authData from '../../data/auth';

/*
LoginRebrand  
click on "Transactions" page
wait 3 seconds
click on "New Transaction" button
wait 2 seconds
check that page contains text "Add new transaction"
wait 3 seconds
generateRandomAmount
enter from stored value "randomAmount" into the input below "Amount" label
wait 3 seconds
click "XXXX"
enter "5555444433331111"
wait 3 seconds
enter "01/28" near "Exp Date"
wait 3 seconds
click "Process" button
wait 5 seconds
check that page contains text "Transaction processed!"
getReferenceNumber // This will return a variable of refNum that contains the reference number
click on link "View transaction"
wait for 5 seconds
check that page contains stored value "refNum"
copy from "refNum" 
click on "close"
click "Transactions"
wait 5 seconds
click "Last 7 Days"
click "Today"
click "All" if page contains "All"
click on "REF #"
enter stored value "refNum"
RebrandclickOnFirstRowInGrid
verify that "GENERAL INFORMATION" is visible
RebrandOpenTransactionSidebarPopoverMenu
click "Void"
click "Void transaction"
wait 5 seconds
click on "View transaction"
wait 5 seconds
click on "close"
*/

test.setTimeout(90000);

test('Testing void of a credit card transaction', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage = new TransactionsPage(page);

  const uniqueAmount = generateUniqueAmount();
  const futureExpDate = generateFutureExpirationDate();
  const testCard1 = authData.testCards.testCard1;
  const option = "Charge";

  await test.step('Login', async () => {
    await loginPage.login();
  });

  await test.step('Go to transaction page', async () => {
    await transactionsPage.navigateToTransactions();
    await transactionsPage.verifyTransactionsHeading();
  });

  await test.step('Create a new transaction "Charge"', async () => {
    await transactionsPage.newTransactionButton.click();
    await expect(transactionsPage.addNewTransactionHeading).toBeVisible();
    await transactionsPage.createNewTransactionByType(uniqueAmount, futureExpDate, testCard1, option);
    await transactionsPage.closeModal();
  });

  await test.step('Find and void a transaction', async () => {
    await page.reload();
    await transactionsPage.clickFirstTransactionInGrid();
    await transactionsPage.generalInformationButton.waitFor({ state: 'visible' });
    await transactionsPage.openTransactionSidebarPopoverMenu();
    await transactionsPage.voidTransaction();
  });
});