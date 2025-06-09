import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.js';
import { ForgotPasswordPage } from './pages/forgotPasswordPage.js';

test('ForgotYourPasswordInvalidEmail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.forgotPasswordLink.click();

  // Type '11' into the email input field
  await forgotPasswordPage.emailInput.fill('11');

  // Press Enter
  await forgotPasswordPage.emailInput.press('Enter');

  // Assert that the form title is still visible
  await expect(page.getByText('Forgot your password?')).toBeVisible();
});
