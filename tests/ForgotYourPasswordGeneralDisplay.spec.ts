import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.js';
import { ForgotPasswordPage } from './pages/forgotPasswordPage.js';


test('ForgotYourPasswordGeneralDisplay', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.forgotPasswordLink.click();

 // await expect(forgotPasswordPage.welcomeMessage).toBeVisible();
 // await expect(page.getByText('Welcome to Sola!')).toBeVisible();

  await expect(forgotPasswordPage.formTitle).toBeVisible();
  await expect(page.getByText('Forgot your password?')).toBeVisible();

  await expect(forgotPasswordPage.emailInput).toBeVisible();
  await expect(forgotPasswordPage.resetPasswordButton).toBeVisible();

  await expect(page.getByText('Do you have an account?')).toBeVisible();
  await expect(forgotPasswordPage.logInLink).toBeVisible();

  await expect(forgotPasswordPage.copyrightSection).toBeVisible();
  await expect(forgotPasswordPage.PCILink).toBeVisible();

});
