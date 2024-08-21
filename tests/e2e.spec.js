const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const ProductsPage = require('./pages/ProductsPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');
const CheckoutOverviewPage = require('./pages/CheckoutOverviewPage');
const CheckoutCompletePage = require('./pages/CheckoutCompletePage');


test.describe('Applause E2E coding exercise', () => {
  test('Validate e2e flow for standard user', async ({ page }) => {
    
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await productsPage.addProductsLessthan10ToCart();
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.cartItemsCount).toHaveText('2');
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.checkout('Harry', 'Singh', '76063');

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.completeCheckout();

    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.orderSuccessful).toHaveText('Thank you for your order!');


  });
})
