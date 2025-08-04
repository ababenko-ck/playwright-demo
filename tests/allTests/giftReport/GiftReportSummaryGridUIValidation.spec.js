import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import GiftReportPage from '../../pages/giftReport.js';

/*
LoginRebrand
click on "Gift Report" page
wait 3 seconds
check that page contains text "Gift Report"
click on "Summary"
check that the page contains "Location", "Transaction Count", "Total Amount", "Parent Location"
check that the page contains "Export"
check that the page contains "Print"
click on "Last 90 Days"
click on "Yesterday"
wait 2 seconds
click on "Yesterday"
wait 3 seconds
*/

test('Gift Report Summary grid UI Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const giftReportPage = new GiftReportPage(page); 

  await loginPage.login();

  await giftReportPage.giftReportLink.click();
  await expect(giftReportPage.giftReportHeading).toBeVisible();

  await expect(giftReportPage.summaryButton).toBeVisible();
  await giftReportPage.summaryButton.click();
  await page.waitForTimeout(3000);

  //columns visibility validation
  await expect(giftReportPage.locationColumn).toBeVisible();
  await expect(giftReportPage.transactionCountColumn).toBeVisible();
  await expect(giftReportPage.totalAmountColumn).toBeVisible();
  await expect(giftReportPage.parentLocationColumn).toBeVisible();

  //buttons visibility validation
  await expect(giftReportPage.exportButton).toBeVisible();
  await expect(giftReportPage.printButton).toBeVisible(); 

  await expect(giftReportPage.selectedDateRangeText).toBeVisible(); 
  await giftReportPage.selectedDateRangeText.click();

  await page.waitForTimeout(2000);
  await expect(giftReportPage.datePickerPopup).toBeVisible();

  await expect(giftReportPage.yesterdayOption).toBeVisible();
  await giftReportPage.yesterdayOption.click({ force: true });
  await page.waitForTimeout(2000);

  await expect(giftReportPage.datePickerPopup).toBeHidden();

  await expect(giftReportPage.table).toBeVisible();
});
