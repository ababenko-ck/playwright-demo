import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { PaymentSitePage } from '../../pages/paymentSite';

/*
LoginRebrand 
RebrandOpenPaymentSITEGeneralSettings
*/

test('Navigate to Payment Site General Settings', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const paymentSitePage = new PaymentSitePage(page);

    await loginPage.login();
    await paymentSitePage.goToPaymentSiteGeneralSettings();
    await expect(paymentSitePage.generalSettingsButton).toBeVisible();
});