import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DisputesPage } from '../../pages/disputesPage';

/*LoginRebrand
click on "Disputes" page
wait 10 seconds
check that page contains text "Disputes "
click on "Columns"
click on "Select all"
click on "Done"
wait 3 seconds
*/

test('Settings button on Disputes grid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const disputesPage = new DisputesPage(page);

  await loginPage.login();
  await disputesPage.disputesLink.click();

  await disputesPage.waitForPageToLoad();
 
  await expect(disputesPage.DisputesHeading).toBeVisible();

  await page.waitForTimeout(3000);
  await expect(disputesPage.columnsButton).toBeVisible();
  await expect(disputesPage.columnsButton).toBeEnabled();
  await disputesPage.columnsButton.click();
  await page.waitForTimeout(3000);

  const isSelectAllButtonVisible = await disputesPage.selectAllButton.isVisible(); 
  if (isSelectAllButtonVisible) {
    // If selectAllButton is visible, click it directly
    await disputesPage.selectAllButton.click({ force: true });
} else {
    // If selectAllButton is NOT visible, click selectCurrency first, then selectAllButton
    await disputesPage.selectCurrency.click({ force: true });
    // After clicking selectCurrency, the selectAllButton is expected to become visible,
    // so we then click it.
    await disputesPage.selectAllButton.click({ force: true });
}

  await page.waitForTimeout(3000);
  await expect(disputesPage.doneButton).toBeVisible();
  await disputesPage.doneButton.click({ force: true });

});
