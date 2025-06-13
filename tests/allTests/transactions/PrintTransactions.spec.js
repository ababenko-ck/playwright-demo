import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { ReportsPage } from '../../pages/reportsPage.js';
import { TransactionsPage } from '../../pages/transactionsPage.js';
import { DashboardPage } from '../../pages/dashboardPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*LoginRebrand
LoginRebrand
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click "All" if page contains "All"
wait 3 seconds
check that page contains "Print"
*/

test('Print Transactions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transactionsPage = new TransactionsPage(page);

  await loginPage.login();

  await page.getByRole('link', { name: 'Transactions' }).click();
  await expect(page.getByRole('heading')).toContainText('Transactions');
  await expect(page.locator('.table__wrapper')).toBeVisible();
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.locator('.table__wrapper')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print' })).toBeVisible();
});

 