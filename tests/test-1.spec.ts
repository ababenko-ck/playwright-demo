import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stgportal2.solapayments.com/login');
  await page.getByRole('textbox', { name: 'user@email.com' }).click();
  await page.getByRole('textbox', { name: 'user@email.com' }).fill('automationtests@cardknox.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Automation1234567!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Disputes' }).click();
  await page.getByText('Columns').click();
  await page.getByText('Select all').click();
});