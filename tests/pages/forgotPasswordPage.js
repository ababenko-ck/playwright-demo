import Locator from '../helpers/Locator';

export class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.logoImg = this.locator.getByRoleName('img', 'logo' );
    this.emailInput = this.locator.getByRoleName('textbox', 'user@email.com');
    this.formTitle = page.locator('.auth__form__title');
    this.welcomeMessage = page.locator('.dashboard__message');
    this.resetPasswordButton = this.locator.getByRoleName('button', 'Reset password');
    this.logInLink = this.locator.getByRoleName('button', 'Log in');
    this.copyrightSection = page.locator('.auth__main__privacy');
    this.PCILink = this.locator.getByRoleName('button', 'PCI Notice');
  }
}