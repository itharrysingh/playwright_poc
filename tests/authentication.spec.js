const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');


const testData = [
  { username: 'standard_user', password: 'secret_sauce', expectedSuccess: true },
  { username: 'locked_out_user', password: 'secret_sauce', expectedSuccess: false },
  { username: 'problem_user', password: 'secret_sauce', expectedSuccess: true },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectedSuccess: true },
  { username: 'error_user', password: 'secret_sauce', expectedSuccess: true },
  { username: 'visual_user', password: 'secret_sauce', expectedSuccess: true },
];

test.describe('Authentication tests', () => {
  testData.forEach(({ username, password, expectedSuccess }) => {
    test(`Login test for ${username}`, async ({ page }) => {

      await page.goto('/');
      const loginPage = new LoginPage(page);
      await loginPage.login(username, password);

      if (expectedSuccess == false) {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
      } else {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

      }

      await page.close();
    });
  })
})