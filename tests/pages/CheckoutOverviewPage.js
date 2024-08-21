class CheckoutOverviewPage {



    constructor(page) {
      this.page = page;
      this.finish = '#finish'
    }

    async completeCheckout(){
        this.page.click(this.finish);
    }
  

  }

  module.exports = CheckoutOverviewPage
  