// solaCheckoutPage.js
// Playwright Page Object Model for Sola Checkout Page

const { expect } = require('@playwright/test');

class SolaCheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Information Locators
    this.companyName = this.page.locator("h2[class='text-base']");
    this.totalDue = this.page.locator("p[class='text-lg font-medium");

    this.googlePay = page.locator('iframe[title="Google Pay checkout"]').contentFrame().getByRole('button', { name: 'Buy with GPay' })

    this.fullName = this.page.getByRole('textbox', { name: 'Full name (optional)' });
    this.email = this.page.getByRole('textbox', { name: 'E-mail (optional)' });
    this.phone = this.page.getByRole('textbox', { name: 'Phone number (optional)' });
    this.address = this.page.getByRole('textbox', { name: 'Street Address (optional)' });
    this.city = this.page.getByRole('textbox', { name: 'City (optional)' });
    this.zip = this.page.getByRole('textbox', { name: 'Zip' });
    this.zipError = this.page.getByText('Zip code is required');
    this.state = this.page.locator('#field-xState');

    this.creditCard = this.page.getByText('Credit/Debit Card');
    this.creditCardNum = this.page.locator('#card-number-field iframe').contentFrame().getByRole('textbox', { name: 'Card Number' });
    this.creditCardNumError = this.page.getByText('Please enter a valid card number');
    this.mmYY = this.page.getByRole('textbox', { name: 'MM/YY' });
    this.mmYYError = this.page.getByText('Please enter a valid expiry date (MM/YY)');
    this.mmYYExpiredError = this.page.getByText('Card has expired');
    this.cvv = this.page.locator('#cvv-field iframe').contentFrame().getByRole('textbox', { name: 'CVC' });
    this.cvvError = this.page.getByText('Please enter a valid CVV');
    this.bankTransfer = this.page.getByText('Bank Transfer (ACH)');
    this.accountName = this.page.getByRole('textbox', { name: 'Full name on account' });;
    this.accountNameError = this.page.getByText('Account holder name is required');
    this.routingNumber = this.page.getByRole('textbox', { name: 'Routing Number' });
    this.routingNumberError = this.page.getByText('Routing number must be exactly 9 digits');
    this.accountNumber = this.page.locator('#ach-field iframe').contentFrame().getByPlaceholder('Bank account number');
    this.accountNumberError = this.page.getByText('Please enter a valid account number');
    this.accountType = this.page.getByLabel('Account type');
    this.accountTypeError = this.page.getByText('Please select an account type');
    this.contractTerms = this.page.locator("div[class='ps-contract-body']");
    this.agreementScrollBox = this.page.locator('iframe[title="ACH Agreement"]').contentFrame().getByText('I hereby authorize this');
    this.acceptContract = this.page.locator('iframe[title="ACH Agreement"]').contentFrame().getByRole('checkbox', { name: 'I acknowledge that I have' });
    this.acceptContractError = this.page.getByText('Missing ACH agreement token');
    this.submitBtn = this.page.getByRole('button', { name: 'Process Payment: $' });

    // Donation Page Specific Locators
    this.amount5 = this.page.getByRole('button', { name: '5', exact: true });
    this.amount10 = this.page.getByRole('button', { name: '10', exact: true });
    this.amount50 = this.page.getByRole('button', { name: '50', exact: true });
    this.amount100 = this.page.getByRole('button', { name: '100', exact: true });
    this.amount200 = this.page.getByRole('button', { name: '200', exact: true });
    this.amount500 = this.page.getByRole('button', { name: '500', exact: true });
    this.donationAmount = this.page.getByRole('textbox', { name: 'Amount' });
    this.donationAmountError = this.page.getByText('Please enter a valid amount');
    this.recurringCheckbox = this.page.getByRole('checkbox', { name: 'Make this donation recurring' });
    this.recurringWeekly = this.page.getByRole('radio', { name: 'week' });
    this.recurringYearly = this.page.getByRole('radio', { name: 'year' });

    // Subscription Page Specific Locators
    this.monthlySubscription = this.page.getByRole('button', { name: 'Monthly' });
    this.yearlySubscription = this.page.getByRole('button', { name: 'Yearly' });
    
    // Product Page Specific Locators
    this.otherAmount = this.page.getByPlaceholder('0.00 (optional)'); //this.page.getByRole('textbox', { name: 'xAmount' });
    this.otherAmountError = this.page.getByText('Please enter a valid amount');
    this.invoice = this.page.getByRole('textbox', { name: 'Invoice (optional)' });
  }

  async getCompanyName() {
    return this.companyName.textContent();
  }

  async getTotalDue() {
    return this.totalDue.textContent();
  }

  async setFullName(value) {
    await this.fullName.fill(value);
  }
  async getFullName() {
    return this.fullName.inputValue();
  }

  async setEmail(value) {
    await this.email.fill(value);
  }
  async getEmail() {
    return this.email.inputValue();
  }

  async setPhone(value) {
    await this.phone.fill(value);
  }
  async getPhone() {
    return this.phone.inputValue();
  }

  async setAddress(value) {
    await this.address.fill(value);
  }
  async getAddress() {
    return this.address.inputValue();
  }

  async setCity(value) {
    await this.city.fill(value);
  }
  async getCity() {
    return this.city.inputValue();
  }

  async setZip(value) {
    await this.zip.fill(value);
  }
  async getZip() {
    return this.zip.inputValue();
  }

  async setState(value) {
    await this.state.selectOption(value);
  }
  async getState() {
    return this.state.inputValue();
  }

  async clickAmount5() {
    await this.amount5.click();
  }
  async clickAmount10() {
    await this.amount10.click();
  }
  async clickAmount50() {
    await this.amount50.click();
  }
  async clickAmount100() {
    await this.amount100.click();
  }
  async clickAmount200() {
    await this.amount200.click();
  }
  async clickAmount500() {
    await this.amount500.click();
  }
  async setDonationAmount(value) {
    await this.donationAmount.fill(value);
  }
  async getDonationAmount() {
    return this.donationAmount.inputValue();
  }
  async clickRecurringCheckbox() {
    await this.recurringCheckbox.click();
  }
  async isRecurringCheckboxChecked() {
    return this.recurringCheckbox.isChecked();
  }
  async selectRecurringWeekly() {
    await this.recurringWeekly.click();
  }
  async selectRecurringYearly() {
    await this.recurringYearly.click();
  }

  async setOtherAmount(value) {
    await this.otherAmount.fill(value);
  }
  async getOtherAmount() {
    return this.otherAmount.inputValue();
  }
  
  async setInvoice(value) {
    await this.invoice.fill(value);
  }
  async getInvoice() {
    return this.invoice.inputValue();
  }

  async selectMonthlySubscription() {
    await this.monthlySubscription.click();
  }
  async selectYearlySubscription() {
    await this.yearlySubscription.click();
  }

  async selectCreditCard() {
    await this.creditCard.click();
  }

  async setCreditCardNum(value) {
    await this.creditCardNum.fill(value);
  }
  async getCreditCardNum() {
    return this.creditCardNum.inputValue();
  }

  async setMMYY(value) {
    await this.mmYY.fill(value);
  }
  async getMMYY() {
    return this.mmYY.inputValue();
  }

  async setCVV(value) {
    await this.cvv.fill(value);
  }
  async getCVV() {
    return this.cvv.inputValue();
  }

  async selectBankTransfer() {
    await this.bankTransfer.click();
  }

  async setAccountName(value) {
    await this.accountName.fill(value);
  }
  async getAccountName() {
    return this.accountName.inputValue();
  }

  async setRoutingNumber(value) {
    await this.routingNumber.fill(value);
  }
  async getRoutingNumber() {
    return this.routingNumber.inputValue();
  }

  async setAccountNumber(value) {
    await this.accountNumber.fill(value);
  }
  async getAccountNumber() {
    return this.accountNumber.inputValue();
  }

  async setAccountType(value) {
    await this.accountType.selectOption(value);
  }
  async getAccountType() {
    return this.accountType.inputValue();
  }

  async scrollToAgreement() {
    const agreementScrollBox = this.agreementScrollBox;
    await agreementScrollBox.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the element to be ready
    return agreementScrollBox
  }

  async clickAcceptContract() {
    await this.acceptContract.isVisible();
    await this.acceptContract.check();
  }
  async isContractAccepted() {
    return this.acceptContract.isChecked();
  }

  async clickSubmit() {
    await expect(this.submitBtn).toBeEnabled();
    await this.submitBtn.click();
  }

  async clickGooglePay() {
    await this.googlePay.click();
  }
}

module.exports = { SolaCheckoutPage };