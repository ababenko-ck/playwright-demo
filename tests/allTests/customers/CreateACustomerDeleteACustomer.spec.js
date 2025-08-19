import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';
import { generateUniqueLastName, generateFutureExpirationDate } from '../../pages/Generator';
import authData from '../../data/auth';

/* LoginRebrand
click on "Customers" page
wait 3 seconds
check that page contains text "Customers"
click on "New Customer"
wait 3 seconds
enter "Test" below "Last Name"
wait 3 seconds
click "XXXX"
enter "5555444433331111"
wait 3 seconds
enter "01/28" near "Exp Date"
wait 3 seconds
click "Save"
wait 3 seconds
check that page contains text "Customer created"
click on "View customer"
wait 5 seconds
verify that "General" is visible on the page
*/

test('Create a Customer and Delete a Customer', async ({ page }) => {
  test.setTimeout(45000); 
  const loginPage = new LoginPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);

  await loginPage.login();

  const uniqueLastName = generateUniqueLastName();
  const futureExpDate = generateFutureExpirationDate();
  const testCard1 = authData.testCards.testCard1;

  await addANewCustomerPage.navigateToCustomers();
  await addANewCustomerPage.waitForPageToLoad();
  await addANewCustomerPage.createNewCustomer(uniqueLastName, futureExpDate, testCard1);
  await addANewCustomerPage.viewCustomerDetails();
  await addANewCustomerPage.deleteCustomer();
});

