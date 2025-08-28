import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { PaymentSitePage } from '../../pages/paymentSite';
import fs from 'fs';

/*
LoginRebrand 
RebrandOpenPaymentSITEManagmentPage
click "Export" button
wait 5 seconds
*/

test('Payment Site Management Export', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const paymentSitePage = new PaymentSitePage(page);

    await loginPage.login();
    await paymentSitePage.goToPaymentSiteManagement();
    await expect(paymentSitePage.managementHeading).toBeVisible();
    await expect(paymentSitePage.exportButton).toBeVisible();
    const filePath = await paymentSitePage.exportPaymentSiteFile();
    expect(fs.existsSync(filePath)).toBeTruthy();
});