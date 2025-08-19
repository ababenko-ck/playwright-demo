import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { AddANewCustomerPage } from '../../pages/addANewCustomer';

/* LoginRebrand
click on "Customers" page
wait 3 seconds
check that page contains text "Customers"
click on "Add Filter"
click on "First Name"
enter "Test" into "First Name"
click on "Done"
wait 5 seconds
*/

test('Filtering on Customers grid', async ({ page }) => {
  test.setTimeout(45000); 
  const loginPage = new LoginPage(page);
  const addANewCustomerPage = new AddANewCustomerPage(page);
  await loginPage.login();
  
  await addANewCustomerPage.navigateToCustomers();

  await addANewCustomerPage.addFilterButton.click();
  await addANewCustomerPage.FirstNameOption.click();
  await addANewCustomerPage.FirstNameTexbox.fill('Test');
  await addANewCustomerPage.SearchButton.click();

  await page.waitForTimeout(5000);
});
