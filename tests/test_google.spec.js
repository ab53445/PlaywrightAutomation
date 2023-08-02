import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByText('‎Super TET 2023 · ‎TET Child Development... · ‎MAHA TET Syllabus 2021').click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByText('Related to recent searches').click();
  await page.locator('.a4bIc').click();
  await page.getByRole('combobox', { name: 'Search' }).click();
});