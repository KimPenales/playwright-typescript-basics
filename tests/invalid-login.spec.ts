import { test, expect } from '@playwright/test';

test('invalid login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('wrong_user');
  await page.locator('#password').fill('wrong_password');

  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});