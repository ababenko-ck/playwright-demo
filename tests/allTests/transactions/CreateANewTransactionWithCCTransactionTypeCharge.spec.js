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
wait 3 seconds
generateRandomAmount
enter from stored value "randomAmount" into the input below "Amount" label
wait 3 seconds
click below "Transaction type"
select "Charge"
enter "5555444433331111" near "Card Number"
wait 3 seconds
enter "01/28" near "Exp Date"
wait 3 seconds
click "Process" button
wait 5 seconds
Rebrand Validate transaction processed
*/

test('Create a new Transaction with CC transaction type Charge', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage= new TransactionsPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  const futureExpDate = generateFutureExpirationDate();
  const uniqueAmount = generateUniqueAmount();
  const testCard1 = authData.testCards.testCard1;
  const option = "Charge";

  await loginPage.login();
  await transactionsPage.navigateToTransactions();
  await transactionsPage.waitForPageToLoad();
  await transactionsPage.newTransactionButton.click();
  await page.waitForTimeout(3000);
 

  await transactionsPage.createNewTransactionByType(uniqueAmount, futureExpDate, testCard1, option);
  await page.waitForTimeout(3000);

  const referenceNumberText = await addANewCustomerPage.referenceNumber.textContent();
  const referenceNumberMatch = referenceNumberText.match(/(\d+)/);
  const transactionNumber = referenceNumberMatch ? referenceNumberMatch[1] : null;
  await addANewCustomerPage.viewTransactionButton.click();
  await expect(addANewCustomerPage.dialog).toContainText(`${transactionNumber}`);
  await addANewCustomerPage.dialogCloseButton.click();
});
