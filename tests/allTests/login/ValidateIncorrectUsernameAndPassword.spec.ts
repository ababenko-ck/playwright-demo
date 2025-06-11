import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';

/* enter "icosic0012@gmail.com" into "Email"
enter "FFARHGHlooLFhZde1@" into "Password"
click on button "Sign in"
wait 3 seconds
check that page contains text "The username/password provided is incorrect."
*/

test('Validate incorrect username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await expect(page.getByRole('heading', { name: 'Sign in to Sola!' })).toBeVisible();
  await loginPage.failedLogin('icosic0012@gmail.com', 'FFARHGHlooLFhZde1@');
  await expect(page.locator('form')).toContainText('The username/password provided is incorrect.');
});
