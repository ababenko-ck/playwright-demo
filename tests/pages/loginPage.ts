import { Page, Locator } from '@playwright/test';
import authData from '../data/auth';

export class LoginPage {
  readonly page: Page;
  readonly logoImg: Locator;
  readonly emailInput: Locator;
  readonly emailInputCreateYourPassword: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly formTitle: Locator;
  readonly welcomeMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly submitButton: Locator;
  readonly createYourPassword: Locator;
  readonly copyrightSection: Locator;
  readonly PCILink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logoImg = page.getByRole('img', { name: 'logo' });
    this.emailInput = page.getByRole('textbox', { name: 'user@email.com' });
    this.emailInputCreateYourPassword = page.getByRole('textbox', { name: 'user@gmail.com' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.formTitle = page.locator('.auth__form__title');
    this.welcomeMessage = page.locator('.dashboard__message');
    this.forgotPasswordLink = page.locator('a[href="javascript:void(0)"]');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.createYourPassword = page.getByRole('button', { name: 'Create your password' });
    this.copyrightSection = page.locator('.auth__main__privacy');
    this.PCILink = page.getByRole('button', { name: 'PCI Notice' });
  }

  async login(environment = 'stg'){
    await this.gotoLoginPage(environment);
    const user = authData[environment].credentials.username;
    const pass = authData[environment].credentials.password;

    await this.emailInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('text=Welcome');
    await this.page.waitForTimeout(2000);
  }

    async failedLogin(user, pass, environment = 'stg'){
    await this.gotoLoginPage(environment);

    await this.emailInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }

  async gotoLoginPage(environment = 'stg') {
    await this.page.goto(authData[environment].baseURL);
  }
}
