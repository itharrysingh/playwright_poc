class CheckoutCompletePage {

    constructor(page) {
      this.page = page;
      this.orderSuccessful = page.locator ('.complete-header')
    }


  }

  module.exports = CheckoutCompletePage
  