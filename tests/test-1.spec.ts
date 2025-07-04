import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('html').click();
  await page.goto('https://stgportal2.solapayments.com/login');
  await expect(page.getByRole('textbox', { name: 'user@email.com' })).toBeVisible();
  await page.getByRole('textbox', { name: 'user@email.com' }).click();
  await page.getByRole('textbox', { name: 'user@email.com' }).fill('ababenko@solapayments.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('portal_75X9Kt:kctVc:3V');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('input:nth-child(2)').fill('7');
  await page.locator('input:nth-child(3)').fill('5');
  await page.locator('input:nth-child(4)').fill('3');
  await page.locator('input:nth-child(5)').fill('0');
  await page.locator('input:nth-child(6)').fill('55');
  await page.locator('input:nth-child(6)').press('Enter');
  await page.getByRole('button', { name: 'Confirm Sign-In' }).click();
  await page.getByRole('link', { name: 'Customers' }).click();
  await page.getByRole('button', { name: 'New Customer' }).click();
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
  await page.getByText('Card number').click();
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('button', { name: 'Credit Card' }).click();
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).click();
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).click();
  await page.locator('div').filter({ hasText: /^Card number\*$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('4444 4444 4444');
  await page.getByRole('button', { name: 'New payment' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
  await page.locator('div').filter({ hasText: /^Card number\*Exp Date \*$/ }).locator('iframe').contentFrame().getByRole('textbox', { name: 'Card Number' }).click({
    button: 'right'
  });
  await page.locator('div').filter({ hasText: 'Add a new customerFirst' }).nth(1).click();
  await page.getByText('Card number*').click();
  await page.getByRole('button', { name: 'New payment' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
});