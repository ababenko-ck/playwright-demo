import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { PaymentSitePage } from '../../pages/paymentSite';

/*
LoginRebrand
RebrandOpenPaymentSITEManagmentPage
wait 5 seconds
click on "Edit" button
wait 10 seconds
check that page contains button "Manage Layout"
*/

test('Navigate to Payment Site Manage Layout', async ({ page }) => {
    test.setTimeout(60000); 

    const loginPage = new LoginPage(page);
    const paymentSitePage = new PaymentSitePage(page);

    await loginPage.login();
    await paymentSitePage.goToPaymentSiteManageLayout();
    await expect(paymentSitePage.manageLayoutButton).toBeVisible();
});