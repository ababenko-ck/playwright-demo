import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*
LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
check that the page contains "Activity"
check that the page contains "Summary"
check that the page contains "Liability"
check that the page contains "Add Filter"
check that the page contains "Gift Balance"
check that the page contains "Export"
check that the page contains "Print"
click on "Last 90 Days"
click on "Yesterday"
wait 2 seconds
check that the page contains "REFERENCE NUMBER", "GIFT CARD NUMBER", "AMOUNT" and "CARDHOLDER NAME", "DATE AND TIME", "LOCATION", "COMMAND", "INVOICE", "CUSTOM01"
click "Date Range:"
click exactly "Custom"
enter "01/16/2022" near "Start Date"
wait 2 seconds
enter "01/18/2022" near "End Date"
click on the button "Apply"
wait 3 seconds
*/

test('Gift Report UI Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();

  await expect(giftReportPage.activityButton).toBeVisible();
  await expect(giftReportPage.summaryButton).toBeVisible();
  await expect(giftReportPage.liabilityButton).toBeVisible();
  await expect(giftReportPage.addFilterButton).toBeVisible();
  await expect(giftReportPage.exportButton).toBeVisible();
  await expect(giftReportPage.printButton).toBeVisible(); 
  await expect(giftReportPage.giftBalanceButton).toBeVisible();
  
  await expect(giftReportPage.selectedDateRangeText).toBeVisible(); 
  await giftReportPage.selectedDateRangeText.click();

  await page.waitForTimeout(2000);
  await expect(giftReportPage.datePickerPopup.first()).toBeVisible();

  await expect(giftReportPage.yesterdayOption).toBeVisible();
  await giftReportPage.yesterdayOption.click({ force: true });
  await page.waitForTimeout(3000);

  await expect(giftReportPage.table).toBeVisible();
  
  await expect(giftReportPage.referenceNumberColumn).toBeVisible();
  await expect(giftReportPage.giftCardNumberColumn).toBeVisible();
  await expect(giftReportPage.amountColumn).toBeVisible();
  await expect(giftReportPage.cardholderNameColumn).toBeVisible();
  await expect(giftReportPage.dateAndTimeColumn).toBeVisible();
  await expect(giftReportPage.locationColumn).toBeVisible();
  await expect(giftReportPage.commandColumn).toBeVisible();
  await expect(giftReportPage.invoiceColumn).toBeVisible();
  await expect(giftReportPage.custom01Column).toBeVisible();

  await expect(giftReportPage.selectedDateRangeText).toBeVisible(); 
  await giftReportPage.selectedDateRangeText.click();

  await page.waitForTimeout(2000);
  await expect(giftReportPage.datePickerPopup.first()).toBeVisible();

  await expect(giftReportPage.customOption).toBeVisible();
  await giftReportPage.customOption.click({ force: true });
  await page.waitForTimeout(3000);

  await expect(giftReportPage.datepicker).toBeVisible();
  await expect(giftReportPage.applyButton).toBeVisible();
  await giftReportPage.applyButton.click({ force: true });
  await page.waitForTimeout(4000);

  await expect(giftReportPage.table).toBeVisible();
});
