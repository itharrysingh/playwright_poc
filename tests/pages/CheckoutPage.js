class CheckoutPage {

    constructor(page) {
      this.page = page;
      this.firstNameInput = '#first-name'
      this.lastNameInput = '#last-name'
      this.zipCodeInput = '#postal-code'
      this.continueButton = '.cart_button'
    }
  
    async checkout(firstName, lastName, zipCode) {
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.zipCodeInput, zipCode);
      await this.page.click(this.continueButton);
    }
  }
  
module.exports = CheckoutPage