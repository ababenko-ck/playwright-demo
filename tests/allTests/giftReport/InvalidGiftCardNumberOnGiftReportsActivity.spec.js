import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';
import authData from '../../data/auth';

/*LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click on "Add Filter"
click on "Gift card number"
enter "5555444433331111" in the "Gift card number"
click "DONE"
wait 3 seconds
verify that "0 Results" is visible on the page
*/

test('Invalid Gift card number on Gift Reports (Activity)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 
  const invalidTestCard = authData.testCards.invalidTestCard;

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();
  
  await expect(giftReportPage.addFilterListItem).toBeVisible();
  await giftReportPage.addFilterButton.click();
  await giftReportPage.giftCardNumberOption.click();
  await giftReportPage.giftCardNumberTextbox.click();
  await giftReportPage.giftCardNumberTextbox.fill(invalidTestCard);
  await giftReportPage.submitButton.click();
  await expect(giftReportPage.zeroResultsText).toBeVisible();
  await expect(giftReportPage.changeFilterText).toBeVisible();
});
