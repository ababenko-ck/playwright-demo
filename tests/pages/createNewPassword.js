import Locator from '../helpers/Locator';

export class CreateNewPasswordPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.registerAccountHeading = this.locator.getByRoleName('heading', 'Register with your account');
    this.alreadyHaveMerchantText = this.locator.getByText('Already have a Merchant');
    this.confirmPasswordInput = this.locator.getByRoleName('textbox', 'Confirm your password');
    this.registerButton = this.locator.getByRoleName('button', 'Register');
    this.firstIcon = page.locator('i').first();
    this.secondIcon = page.locator('i').nth(1);
  }

  async clickRegisterAccountHeading() {
    await this.registerAccountHeading.click();
  }

  async clickAlreadyHaveMerchantText() {
    await this.alreadyHaveMerchantText.click();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async clickFirstIcon() {
    await this.firstIcon.click();
  }

  async clickSecondIcon() {
    await this.secondIcon.click();
  }
}
