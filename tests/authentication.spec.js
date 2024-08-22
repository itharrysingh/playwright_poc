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

test.describe('Authentication tests - happy paths', () => {
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


const testData_Negative = [
  { username: 'standard1_user', password: 'secret_sauce', expectedSuccess: false },
  { username: 'locked_out__user', password: 'secret_sauce', expectedSuccess: false },
  { username: 'problem_us%$Her', password: 'secret_sauce', expectedSuccess: false },
  { username: 'performance___glitch_user', password: 'secret_sauce', expectedSuccess: false },
  { username: 'erroruser', password: 'secret_sauce', expectedSuccess: false },
  { username: 'visual_user_', password: 'secret_sauce', expectedSuccess: false },
  { username: 'standard_user', password: '', expectedSuccess: false },
  { username: 'locked_out_user', password: 'secret235_sauce', expectedSuccess: false },
  { username: 'problem_user', password: 'secret_sauce%$%$^dfh', expectedSuccess: false },
  { username: 'performance_glitch_user', password: 'null', expectedSuccess: false },
  { username: 'error_user', password: '346656654', expectedSuccess: false },
  { username: 'visual_user', password: '1', expectedSuccess: false },
  { username: 'null', password: 'null', expectedSuccess: false },
  { username: '', password: '', expectedSuccess: false },
];

test.describe('Authentication tests - negative tests', () => {
  testData_Negative.forEach(({ username, password, expectedSuccess }) => {
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
