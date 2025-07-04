import { test, expect } from '@playwright/test';

test('Delete a Customer', async ({ page }) => {
 const loginPage = new LoginPage(page);

  await loginPage.login();

  await page.getByRole('link', { name: 'Customers' }).click();
  await expect(page.getByRole('heading', { name: 'Customers' })).toBeVisible();
  await page.getByRole('button', { name: 'New Customer' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Exp Date *' }).click();
  await page.getByRole('textbox', { name: 'Exp Date *' }).fill('01/28');
  await page.getByRole('textbox', { name: 'Card Number *' }).click();
  await page.getByRole('textbox', { name: 'Card Number *' }).fill('5555444433331111');
 
  await page.getByRole('button', { name: 'Note that transactions' }).click();
  await expect(page.getByRole('heading', { name: 'Customer created' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('link', { name: 'View customer' }).click();
  await expect(page.getByText('General', { exact: true })).toBeVisible();
  await page.locator('div').filter({ hasText: /^New Transaction$/ }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('heading', { name: 'Customer deleted' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});