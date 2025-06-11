import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';


test('LoginPageGeneralDisplay', async ({ page }) => {
  // Instantiate the LoginPage object with the current page
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.gotoLoginPage();

  // Assert that the logo image is visible
  await expect(loginPage.logoImg).toBeVisible();

  // Assert that the welcome message is visible
  //await expect(loginPage.welcomeMessage).toBeVisible();
  //await expect(page.getByText('Welcome to Sola!')).toBeVisible();

  // Assert that the form title is visible
  await expect(loginPage.formTitle).toBeVisible();
  await expect(page.getByText('Sign in to Sola!')).toBeVisible();

  // Assert that the email input field is visible
  await expect(loginPage.emailInput).toBeVisible();

  // Assert that the password input field is visible
  await expect(loginPage.passwordInput).toBeVisible();

  // Assert that the "Forgot Password" link is visible
  await expect(loginPage.forgotPasswordLink).toBeVisible();

  // Assert that the "Remember Me" checkbox is visible
  await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  await expect(page.getByText('Sign in to Sola!')).toBeVisible();

  // Assert that the submit button is visible
  await expect(loginPage.submitButton).toBeVisible();

  // Assert that the copyright section is visible
  await expect(loginPage.copyrightSection).toBeVisible();

  // Assert that the PCI link is visible
  await expect(loginPage.PCILink).toBeVisible()

});
