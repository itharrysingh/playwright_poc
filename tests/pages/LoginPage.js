class LoginPage {

    constructor(page) 
    {
      this.page = page;
      this.emailInput = '#email'
      this.passwordInput = '#password'
      this.submitButton = 'button[class*="submit-btn"]'
    
    }
  
    async login(username, password) {
      await this.page.fill(this.emailInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.submitButton);
    }

    async isErrorVisible() {
      return await this.page.isVisible(this.errorMessage);
    }
  }
  
module.exports = LoginPage