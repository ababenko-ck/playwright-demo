import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';
import { generateUniqueAmount, generateUniqueLastName } from '../../pages/Generator';
import { TransactionsPage } from '../../pages/transactionsPage';

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
click "Check"
wait 1 seconds
click "Checking"
click "Saving"
Rebrand InputCheckingInformation
wait 5 seconds
Rebrand Validate transaction processed
*/

test('Create a new transaction with Check account type Saving', async ({ page }) => {
  test.setTimeout(45000);
  const loginPage = new LoginPage(page);
  const transactionsPage= new TransactionsPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  const uniqueAmount = generateUniqueAmount();
  const name = generateUniqueLastName();
  const option = "Saving";

  await loginPage.login();
  await transactionsPage.navigateToTransactions();
  await transactionsPage.waitForPageToLoad();
  await transactionsPage.newTransactionButton.click();
  await page.waitForTimeout(3000);

  await transactionsPage.createNewTransactionChecking(uniqueAmount, name, option);
  await page.waitForTimeout(3000);

  const referenceNumberText = await addANewCustomerPage.referenceNumber.textContent();
  const referenceNumberMatch = referenceNumberText.match(/(\d+)/);
  const transactionNumber = referenceNumberMatch ? referenceNumberMatch[1] : null;
  await addANewCustomerPage.viewTransactionButton.click();
  await expect(addANewCustomerPage.dialog).toContainText(`${transactionNumber}`);
  await addANewCustomerPage.dialogCloseButton.click();
});
