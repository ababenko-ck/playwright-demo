import { test, expect, type Page  } from '@playwright/test';
import { SolaCheckoutPage } from '../../pages/solaCheckoutPage';
import { GooglePayPage } from '../../pages/googlePayPage';
import { env } from 'process';

let page: Page;

test.beforeAll('open', async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(env.SOLA_CHECKOUT_BASEURL + '/theoldyorktimes');

  await expect(page).toHaveTitle('Sola Checkout');
});

test('has title', async () => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Sola Checkout');
});

test('Required CC fields', async () => {
    const checkoutPage = new SolaCheckoutPage(page);

    await checkoutPage.selectCreditCard();
    await checkoutPage.clickSubmit();

    await expect(checkoutPage.zipError).toBeVisible();
    await expect(checkoutPage.creditCardNumError).toBeVisible();
    await expect(checkoutPage.cvvError).toBeVisible();
    await expect(checkoutPage.mmYYError).toBeVisible();
});

test('Required ACH fields', async () => {
    const checkoutPage = new SolaCheckoutPage(page);

    await checkoutPage.selectBankTransfer();
    await checkoutPage.clickSubmit();

    await expect(checkoutPage.zipError).toBeVisible();
    await expect(checkoutPage.accountNameError).toBeVisible();
    await expect(checkoutPage.accountNumberError).toBeVisible();
    await expect(checkoutPage.routingNumberError).toBeVisible();
    await expect(checkoutPage.accountTypeError).toBeVisible();
    await expect(checkoutPage.acceptContractError).toBeVisible();
});

test('Invalid CC number', async () => {
    const checkoutPage = new SolaCheckoutPage(page);

    await checkoutPage.setZip('07731');

    await checkoutPage.selectCreditCard();

    await checkoutPage.setCreditCardNum('1234 5678 9012 345');
    await checkoutPage.setMMYY('12/27');
    await checkoutPage.setCVV('123');
    await checkoutPage.clickSubmit();

    await expect(checkoutPage.creditCardNumError).toBeVisible();
});

test('Expired CC number', async () => {
    const checkoutPage = new SolaCheckoutPage(page);

    await checkoutPage.setZip('07731');

    await checkoutPage.selectCreditCard();

    await checkoutPage.setCreditCardNum('4444 3333 2222 1111');
    await checkoutPage.setMMYY('05/25');
    await checkoutPage.setCVV('123');
    await checkoutPage.clickSubmit();
    
    await expect(checkoutPage.mmYYExpiredError).toBeVisible();
});

test('Invalid Transaction Amount', async () => {
    const checkoutPage = new SolaCheckoutPage(page);

    // This error only appears after changing fields.
    await checkoutPage.setDonationAmount('-3.00');
    await checkoutPage.setFullName('Test User');

    await expect(checkoutPage.donationAmountError).toBeVisible();
});

test('New Valid CC Purchase Subscription', async ({ context }) => {
    const extraString = await page.evaluate(() => {
        function generateData() {
            const now = new Date();
            const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${now.getFullYear()}`;
            const guid = crypto.randomUUID().replace(/-/g, '').substring(0, 17);
            return `_${dateStr}_${guid}`;
        }
        return generateData();
    });

    const requestAmount = (Math.random() * 10).toFixed(2);
    console.log('Request Amount:', requestAmount);

    const checkoutPage = new SolaCheckoutPage(page);
    await checkoutPage.setFullName('Test User' + extraString);
    await checkoutPage.setEmail('test' + extraString + '@test.com');
    await checkoutPage.setPhone('2125551111');
    await checkoutPage.setAddress('4900 US-9');
    await checkoutPage.setCity('Howell Township');
    await checkoutPage.setZip('07731');
    await checkoutPage.setState('NJ');
    
    await checkoutPage.setDonationAmount(requestAmount);

    await checkoutPage.clickRecurringCheckbox();
    await checkoutPage.selectRecurringWeekly();

    await checkoutPage.selectCreditCard();
    await checkoutPage.setCreditCardNum('4444 3333 2222 1111');
    await checkoutPage.setMMYY('12/25');
    await checkoutPage.setCVV('123');

    await checkoutPage.clickSubmit();

    await page.waitForTimeout(5000);
    await page.screenshot({ path: './Screenshots/firstSubmit.png' });
});

test('New Valid ACH Purchase Subscription', async ({ context }) => {
    const extraString = await page.evaluate(() => {
        function generateData() {
            const now = new Date();
            const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${now.getFullYear()}`;
            const guid = crypto.randomUUID().replace(/-/g, '').substring(0, 17);
            return `_${dateStr}_${guid}`;
        }
        return generateData();
    });

    const checkoutPage = new SolaCheckoutPage(page);
    await checkoutPage.setFullName('Test User' + extraString);
    await checkoutPage.setEmail('test' + extraString + '@test.com');
    await checkoutPage.setPhone('2125551111');
    await checkoutPage.setAddress('4900 US-9');
    await checkoutPage.setCity('Howell Township');
    await checkoutPage.setZip('07731');
    await checkoutPage.setState('NJ');

    await checkoutPage.clickAmount100();
    await checkoutPage.clickAmount5();

    await checkoutPage.selectBankTransfer();
    await checkoutPage.setAccountName('Test User');
    await checkoutPage.setAccountNumber('123456789');
    await checkoutPage.setRoutingNumber('021000021');
    await checkoutPage.setAccountType('Checking Account');
    
    await checkoutPage.clickAcceptContract();
    await checkoutPage.clickSubmit();

    // Currently the page receives an ACH token error that disappears after a few seconds.
    await page.screenshot({ path: './Screenshots/firstSubmit.png' });

    // Wait for the error to disappear before proceeding
    await page.waitForTimeout(10000);
    await checkoutPage.clickSubmit();
    await page.waitForTimeout(5000);

    await page.screenshot({ path: './Screenshots/secondSubmit.png' });
});

test('New Valid Google Pay Purchase Subscription', async ({ context }) => {
    const extraString = await page.evaluate(() => {
        function generateData() {
            const now = new Date();
            const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${now.getFullYear()}`;
            const guid = crypto.randomUUID().replace(/-/g, '').substring(0, 17);
            return `_${dateStr}_${guid}`;
        }
        return generateData();
    });

    const requestAmount = (Math.random() * 10).toFixed(2);
    console.log('Request Amount:', requestAmount);

    const checkoutPage = new SolaCheckoutPage(page);
    await checkoutPage.setFullName('Test User' + extraString);
    await checkoutPage.setEmail('test' + extraString + '@test.com');
    await checkoutPage.setPhone('2125551111');
    await checkoutPage.setAddress('4900 US-9');
    await checkoutPage.setCity('Howell Township');
    await checkoutPage.setZip('07731');
    await checkoutPage.setState('NJ');
    
    await checkoutPage.setDonationAmount(requestAmount);

    const page1Promise = page.waitForEvent('popup');
    await checkoutPage.clickGooglePay();

    /* TODO:
       The Save and Skip buttons are only used the first time through the flow and not after that. 
    */
    const page1 = await page1Promise;
    const googlePayPages = new GooglePayPage(page1);
    await googlePayPages.setName(env.GOOGLE_PAY_USER);
    await googlePayPages.clickNext();

    await googlePayPages.setPassword(env.GOOGLE_PAY_PASSWORD);
    await googlePayPages.clickNext();

    //await googlePayPages.clickSave();
    //await googlePayPages.clickSkip();
    await googlePayPages.clickPay();

    await page.waitForTimeout(5000);
});