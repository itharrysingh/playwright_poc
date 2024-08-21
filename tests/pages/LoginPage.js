class LoginPage {

    constructor(page) 
    {
      this.page = page;
      this.usernameInput = '#user-name'
      this.passwordInput = '#password'
      this.loginButton = '#login-button'
      this.errorButton = '.error-button'
      this.errorMessage = '.error-message';
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }

    async isErrorVisible() {
      return await this.page.isVisible(this.errorMessage);
    }
  }
  
module.exports = LoginPage