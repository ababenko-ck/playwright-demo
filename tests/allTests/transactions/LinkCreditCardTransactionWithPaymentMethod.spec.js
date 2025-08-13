import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TransactionsPage } from '../../pages/transactionsPage';
import { generateUniqueAmount, generateFutureExpirationDate } from '../../pages/Generator';
import authData from '../../data/auth';

/*
LoginRebrand 
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click on "New Transaction" button
wait 2 seconds
check that page contains text "Add New transaction"
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
click on "close"
click on "Transactions"
wait 5 seconds 
click on "Last 7 days"
click on "Today"
wait 2 seconds
click on "RESULT" with at least "1" percent overlap on the left of "COMMAND"
click on input "RESULT"
enter "Approved"
click on checkbox "Approved"
check that checkbox "Approved" is checked
wait 3 seconds
click "COMMAND"
click on checkbox "CC:Sale"
check that checkbox "CC:Sale" is checked 
RebrandclickOnFirstRowInGrid
verify that "GENERAL INFORMATION" is visible
RebrandOpenTransactionSidebarPopoverMenu
click "Link payment method"
wait 5 seconds
click below "CUSTOMER ID"
click "Save"
wait 3 seconds
click "View Customer"
wait 5 seconds
verify that "Payments" is visible
*/

test.setTimeout(90000);

test('Testing linking credit card transaction with payment method', async ({ page }) => {
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
    await transactionsPage.waitForPageToLoad();
  });

  await test.step('Create a new transaction "Charge"', async () => {
    await transactionsPage.newTransactionButton.click();
    await expect(transactionsPage.addNewTransactionHeading).toBeVisible();
    await transactionsPage.createNewTransactionByType(uniqueAmount, futureExpDate, testCard1, option);
    await transactionsPage.waitForPageToLoad();
    await transactionsPage.closeModal();
  });

  await test.step('Find and link a transaction', async () => {
    await page.reload(); 
    await transactionsPage.clickFirstTransactionInGrid();
    await transactionsPage.generalInformationButton.waitFor({ state: 'visible' });
    await transactionsPage.openTransactionSidebarPopoverMenu();
    await transactionsPage.linkPaymentMethodButton.click();
  }); 

await test.step('5. Select first customer ID and save', async () => {
    await page.waitForSelector('td.is-loading', { state: 'detached', timeout: 10000 });
    await transactionsPage.firstLabel.waitFor({ state: 'visible' });
    await transactionsPage.firstLabel.click();
    await transactionsPage.saveButton.waitFor({ state: 'visible' });
    await transactionsPage.saveButton.click();
});
});