const { test, expect } = require('@playwright/test');
class AppointmentReservationPage {

  constructor(page) {
    this.page = page;
    this.stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]').first()
    this.creditCardField = this.stripeFrame.locator('#Field-numberInput');
    this.expirationDateField = this.stripeFrame.locator('#Field-expiryInput');
    this.securityCodeField = this.stripeFrame.locator('#Field-cvcInput');
    this.selectCountryDropdown = this.stripeFrame.locator('#Field-countryInput');
    this.zipcodeField = this.stripeFrame.locator('input[id="Field-postalCodeInput"]');
    this.continueButton = page.locator('[data-test="submit"]');
    this.cardDeclineError = this.stripeFrame.locator('#Field-numberError');
    this.confirmationContainer = page.locator('div.scan-confirm__details-container');
    this.confirmationContainerScanType = page.getByText('MRI Scan Appointment', { exact: true });

  }

  async fillPaymentCC(creditCardNumber) {
    await this.creditCardField.fill(creditCardNumber)

  }

  async fillPaymentExpirationDate(expirationDate) {
    await this.expirationDateField.fill(expirationDate);
  }

  async fillPaymentSecurityCode(securityCode) {
    await this.securityCodeField.fill(securityCode);
  }

  async selectCountry(countryCode) {
    await this.selectCountryDropdown.selectOption(countryCode);
  }

  async fillPaymentZipcode(zipCode) {
    await this.zipcodeField.fill(zipCode);
  }

  async clickContinue() {
    await Promise.all([
      this.page.waitForURL('**/scan-confirm', { timeout: 20000 }),,
      this.continueButton.click()
    ]);

  }

}

module.exports = AppointmentReservationPage