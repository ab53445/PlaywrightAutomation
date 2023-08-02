// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://google.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test('verify google search button', async ({ page }) => {
    await page.goto('https://google.com/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Google Search' }).click();
  
    // Expects the URL to contain intro.
    //await expect(page).toHaveURL(/.*intro/);
  });

test('verify feeling lucky button', async ({ page }) => {
  await page.goto('https://google.com/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Feeling Lucky' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*doodles/);
});
