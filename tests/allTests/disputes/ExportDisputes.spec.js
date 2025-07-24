import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DisputesPage } from '../../pages/disputesPage';

/*LoginRebrand
click on "Disputes" page
wait 3 seconds
check that page contains text "Disputes"
click on "Export" button
wait 3 seconds
*/

test('Export Disputs', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const disputesPage = new DisputesPage(page);

  await loginPage.login();
  await disputesPage.disputesLink.click();
  await disputesPage.waitForPageToLoad();
  await page.waitForTimeout(2000);
  
  await expect(disputesPage.DisputesHeading).toBeVisible();
  await expect(disputesPage.exportButton).toBeVisible();
});
