import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage, exportButton } from '../../pages/addANewCustomer';
import { generateUniqueLastName, generateFutureExpirationDate } from '../../pages/Generator';
import authData from '../../data/auth';

/* LoginRebrand
click on "Customers" page
wait 3 seconds
check that page contains text "Customers"
wait 3 seconds
verify that "Print" button is visible on the page
*/

test('Print Customers', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  await loginPage.login();

  await addANewCustomerPage.navigateToCustomers();

  await expect(addANewCustomerPage.printButton).toBeVisible();
  await expect(addANewCustomerPage.printButton).toBeEnabled();
});
