import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.js';
import { ForgotPasswordPage } from './pages/forgotPasswordPage.js';

test('ForgotYourPasswordEmptyInput', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.forgotPasswordLink.click();

  // Click inside email input, but do not provide any value
  await forgotPasswordPage.emailInput.click();

  // Click on 'Reset Password' button
  await forgotPasswordPage.resetPasswordButton.click();

  // Verify error message 'Please enter your email.'
  await expect(page.getByText('Please enter your email.')).toBeVisible();
});
