import { Page, Locator } from '@playwright/test';

export class LoginPage {
 

  constructor(page) {
    this.page = page;

    this.logoImg = page.getByRole('img', { name: 'logo' });
    this.emailInput = page.getByRole('textbox', { name: 'user@email.com' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.formTitle = page.locator('.auth__form__title');
    this.welcomeMessage = page.locator('.dashboard__message');
    this.forgotPasswordLink = page.locator('a[href="javascript:void(0)"]');
    this.rememberMeCheckbox = page.locator('#rememberuser');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.createYourPassword = page.getByRole('button', { name: 'Create your password' });
    this.copyrightSection = page.locator('.auth__main__privacy');
    this.PCILink = page.getByRole('button', { name: 'PCI Notice' });
  }

  async login(username, password){
     await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('text=Welcome');
    await this.page.waitForTimeout(2000);
  }

  async gotoLoginPage() {
    await this.page.goto('https://stgportal2.solapayments.com/login');
  }
}
