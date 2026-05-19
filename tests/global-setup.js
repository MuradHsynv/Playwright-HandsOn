import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const STORAGE_STATE = path.resolve('state.json');

setup('accept cookies and login', async ({ page, context }) => {
  await page.goto('/');

  // Cookies
  const cookieBtn = page.locator('#accept-cookies-button, button:has-text("Accept")');
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
    await cookieBtn.waitFor({ state: 'hidden', timeout: 1500 });
  } else {
    console.warn('No cookie found, skipping cookies');
  }

  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');

  await context.storageState({ path: STORAGE_STATE });
  if (!fs.existsSync(STORAGE_STATE)) {
    throw new Error(`Failed to write storage state to ${STORAGE_STATE}`);
  }
});