import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*
LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click on "Summary"
click on "Date Range:"
wait 3 seconds
click exactly "Custom"
enter "01/16/2022" near "Start Date"
wait 2 seconds
enter "01/18/2022" near "End Date"
click on the button "Apply"
wait 3 seconds
*/

test('Gift Report Summary', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();


  await expect(giftReportPage.summaryButton).toBeVisible();
  await giftReportPage.summaryButton.click();
  await page.waitForTimeout(3000);

  await expect(giftReportPage.selectedDateRangeText).toBeVisible(); 
  await giftReportPage.selectedDateRangeText.click();

  await page.waitForTimeout(2000);
  await expect(giftReportPage.datePickerPopup).toBeVisible();

  await expect(giftReportPage.customOption).toBeVisible();
  await giftReportPage.customOption.click({ force: true });
  await page.waitForTimeout(3000);

  await expect(giftReportPage.datepicker).toBeVisible();
  await expect(giftReportPage.applyButton).toBeVisible();
  await giftReportPage.applyButton.click({ force: true });
  await page.waitForTimeout(4000);

  await expect(giftReportPage.table).toBeVisible();
});
