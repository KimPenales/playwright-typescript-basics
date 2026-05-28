import { test, expect } from '@playwright/test';

test('user can logout', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  await page.getByRole('button', { name: 'Open Menu' }).click();

  await expect(page.locator('#logout_sidebar_link')).toBeVisible();

  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});