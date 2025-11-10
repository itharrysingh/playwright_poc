const { test, expect } = require('@playwright/test');
const creds = require('../tests/credentials.json');
const LoginPage = require('./pages/LoginPage');


const testData = [
  { username: creds.validUsers[0].user, password: creds.validUsers[0].pass, expectedSuccess: true },
  { username: creds.validUsers[1].user, password: creds.validUsers[1].pass, expectedSuccess: false },
];

test.describe('Authentication tests valid and invalid user', () => {
  
  testData.forEach(({ username, password, expectedSuccess }) => {
      
    test(`Authentication for ${username}`, async ({ page }) => {

      await page.goto('/');
      const loginPage = new LoginPage(page);
      await loginPage.login(username, password);

      if (expectedSuccess == false) {
        await expect(page).toHaveURL('https://myezra-staging.ezra.com/sign-in');
      } else {
        await expect(page).toHaveURL('https://myezra-staging.ezra.com/');
      }
      await page.close();
    });
  })
})


