import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { CreateNewPasswordPage } from '../../../pages/createNewPassword';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const createNewPasswordPage = new CreateNewPasswordPage(page);

  await loginPage.gotoLoginPage();
  
  await loginPage.createYourPassword.click();
  await loginPage.logoImg.click();
  await expect(loginPage.logoImg).toBeVisible();
  await createNewPasswordPage.clickRegisterAccountHeading();
  await expect(createNewPasswordPage.registerAccountHeading).toBeVisible();
  await createNewPasswordPage.clickAlreadyHaveMerchantText();
  await createNewPasswordPage.clickAlreadyHaveMerchantText();
  await expect(loginPage.emailInputCreateYourPassword).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(createNewPasswordPage.confirmPasswordInput).toBeVisible();
  await expect(createNewPasswordPage.registerButton).toBeVisible();
  await expect(loginPage.copyrightSection).toBeVisible();
  await expect(loginPage.PCILink).toBeVisible();
  await createNewPasswordPage.clickFirstIcon();
  await expect(createNewPasswordPage.firstIcon).toBeVisible();
  await createNewPasswordPage.clickSecondIcon();
});
