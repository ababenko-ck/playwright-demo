import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage {
 

  constructor(page) {
    this.page = page;

    this.logoImg = page.getByRole('img', { name: 'logo' });
    this.emailInput = page.getByRole('textbox', { name: 'user@gmail.com' });
   
    this.formTitle = page.locator('.auth__form__title');
    this.welcomeMessage = page.locator('.dashboard__message');
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset password' });
    this.logInLink = page.getByRole('button', { name: 'Log in' });
    this.copyrightSection = page.locator('.auth__main__privacy');
    this.PCILink = page.getByRole('button', { name: 'PCI Notice' });
  }

}