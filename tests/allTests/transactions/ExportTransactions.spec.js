import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TransactionsPage } from '../../pages/transactionsPage';

/*LoginRebrand
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click "All" if page contains "All"
wait 3 seconds
click on button "Export"
wait 3 seconds
*/

test(' Export Transactions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage = new TransactionsPage(page);

  await loginPage.login();
  await transactionsPage.navigateToTransactions();
  await transactionsPage.waitForPageToLoad();

  await expect(transactionsPage.exportButton).toBeVisible();
  await expect(transactionsPage.exportButton).toBeEnabled();
  await transactionsPage.exportButton.click();
  await expect(transactionsPage.actionButtonDropdown).toBeVisible();
});
