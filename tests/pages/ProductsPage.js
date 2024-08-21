class ProductsPage {


    constructor(page) {
      this.page = page;
      this.cartButton = '.shopping_cart_link'
      this.addToCartBikeLight = '#add-to-cart-sauce-labs-bike-light'
      this.addToCartOnesie = '#add-to-cart-sauce-labs-onesie'
    }
  
    async addProductsLessthan10ToCart() {
      await this.page.click(this.addToCartBikeLight);
      await this.page.click(this.addToCartOnesie);

    }
  
    async goToCart() {
      await this.page.click(this.cartButton);
    }
  }
  
  module.exports = ProductsPage