import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';
import { TransactionsPage } from '../../pages/transactionsPage'; 
import { generateFutureExpirationDate, generateUniqueAmount } from '../../pages/Generator';
import authData from '../../data/auth';

/*LoginRebrand
click on "Customers" page
wait 10 seconds
check that page contains text "Customers"
wait 3 seconds
click below "Customer ID"
wait 5 seconds
click on "New transaction"
wait 3 seconds
generateRandomAmount
enter from stored value "randomAmount" into the input "Amount"
wait 3 seconds
click below "Credit card"
click on "New card"
enter "5555444433331111" near "Card Number"
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
click on "close"
wait 5 seconds
*/

test('Create s new Transaction from an existing Customer', async ({ page }) => {
  test.setTimeout(45000);
  const loginPage = new LoginPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  const transactionsPage = new TransactionsPage(page);
  const futureExpDate = generateFutureExpirationDate();
  const uniqueAmount = generateUniqueAmount();
  const testCard1 = authData.testCards.testCard1;

  await loginPage.login();
  await addANewCustomerPage.navigateToCustomers();
  await addANewCustomerPage.filterCustomersByLastName();
  await expect(addANewCustomerPage.firstCustomerInGrid).toBeVisible();
  await addANewCustomerPage.firstCustomerInGrid.click();

  await transactionsPage.newTransactionButton.click();
  await expect(transactionsPage.addNewTransactionHeading).toBeVisible();

  await addANewCustomerPage.createNewTransactionFromExistingCustomer(uniqueAmount, futureExpDate, testCard1);

  const referenceNumberText = await addANewCustomerPage.referenceNumber.textContent();
  const referenceNumberMatch = referenceNumberText.match(/(\d+)/);
  const transactionNumber = referenceNumberMatch ? referenceNumberMatch[1] : null;
  await addANewCustomerPage.viewTransactionButton.click();
  await expect(addANewCustomerPage.dialog).toContainText(`${transactionNumber}`);
  await addANewCustomerPage.dialogCloseButton.click();
});
