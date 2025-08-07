import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TransactionsPage } from '../../pages/transactionsPage';
import authData from '../../data/auth';

/*
LoginRebrand 
click on "Transactions" page
wait 3 seconds
check that page contains text "Transactions"
click on "Last 7 Days" 
click exactly "Custom"
enter "01/18/2022" near "Start Date" 
wait 2 seconds
enter "01/16/2022" near "End Date"
click on the button "Apply"
wait 3 seconds
click "All"
wait 10 seconds
verify that "1/18/2022" is visible
*/

test.setTimeout(90000);

test('Testing date range on transaction grid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transactionsPage = new TransactionsPage(page);

    await test.step('1. Login', async () => {
        await loginPage.login();
        await expect(page).toHaveURL('https://stgportal2.solapayments.com/');
    });

    await test.step('2. Go to transaction page', async () => {
        await transactionsPage.navigateToTransactions();
        await transactionsPage.verifyTransactionsHeading();
    });

    await test.step('3. Choose "This month" from the dropdown menu', async () => {
        await page.getByRole('listitem').filter({ hasText: 'Last 7 Days' }).locator('div').click();
        await page.getByRole('menuitem', { name: 'This Month' }).click();
        await page.waitForLoadState('networkidle');
    });
});
