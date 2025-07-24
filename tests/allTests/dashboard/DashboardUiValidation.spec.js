import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { DashboardPage } from '../../pages/dashboardPage';
import { getTodaysDate } from '../../pages/Generator';

/*LoginRebrand
wait 5 seconds
click on "Dashboard"
wait 2 seconds
click on the button "Yesterday"
wait 2 seconds
click exactly "Custom"
enter "01/16/2025" near "Start Date"
wait 2 seconds
enter "01/18/2025" near "End Date"
click on the button "Apply"
wait 3 seconds
*/

test('Dashboard UI Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.login();

  await dashboardPage.dashboardLink.click();
  await expect(dashboardPage.welcomeHeading).toBeVisible();
  await dashboardPage.dateRangeMenu.click();
  await dashboardPage.customDateRangeButton.click();
  await page.waitForTimeout(3000); 
  await expect(dashboardPage.applyButton).toBeVisible();
  await dashboardPage.applyButton.click({ force: true });
  const todaysDate = getTodaysDate();
  await expect(dashboardPage.daterangeText).toContainText(`${todaysDate} - ${todaysDate}`);
});
