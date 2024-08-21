class CartPage {

    constructor(page) {
      this.page = page;
      this.checkoutButton = '#checkout'
      this.cartItemsCount = page.locator('.shopping_cart_badge');
    }

    async proceedToCheckout() {
      await this.page.click(this.checkoutButton);
    }
  }
  
  module.exports = CartPage