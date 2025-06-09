import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.js';

test('InvalidSignIn', async ({ page }) => {
  // Instantiate the LoginPage object with the current page
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.gotoLoginPage();

  // Fill in invalid email and password
  await loginPage.emailInput.fill('invalid@example.com');
  await loginPage.passwordInput.fill('wrongpassword');

  // Click on the Sign in button
  await loginPage.submitButton.click();

  // Verify error message
  await expect(page.getByText('The username/password provided is incorrect.')).toBeVisible();
});
