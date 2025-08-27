import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*
LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click on "Liability"
check that the page contains "Gift Card Number", "Remaining Balance", "First Name", "Last Name", "Email"
check that the page contains "Export"
check that the page contains "Print"
*/

test('Gift Report Liability grid UI Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();

  await expect(giftReportPage.liabilityButton).toBeVisible();
  await giftReportPage.liabilityButton.click();
  await page.waitForTimeout(3000);

  await expect(giftReportPage.giftCardNumberColumn).toBeVisible();
  await expect(giftReportPage.remainingBalanceColumn).toBeVisible();
  await expect(giftReportPage.firstNameColumn).toBeVisible();
  await expect(giftReportPage.lastNameColumn).toBeVisible();
  await expect(giftReportPage.emailColumn).toBeVisible();

  await expect(giftReportPage.exportButton).toBeVisible();
  await expect(giftReportPage.printButton).toBeVisible(); 
});
