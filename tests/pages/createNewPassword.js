import { Page, Locator } from '@playwright/test';

export class CreateNewPasswordPage {
  constructor(page) {
    this.page = page;
    this.registerAccountHeading = page.getByRole('heading', { name: 'Register with your account' });
    this.alreadyHaveMerchantText = page.getByText('Already have a Merchant');
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm your password' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
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
