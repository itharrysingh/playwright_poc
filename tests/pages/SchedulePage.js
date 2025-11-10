class SchedulePage {

  constructor(page) {
    this.page = page;
    this.firstLocation = page.locator('div.location-card').first();
    this.firstOpenDate = page.locator('.vuecal__cell:not(.vuecal__cell--disabled)').first();
    this.firstOpenTime = page.locator('.appointments__individual-appointment:not([style*="display: none"]) label').first();
    this.submitScheduleSelection = page.locator('[data-test="submit"]');
  }

  async selectLocation() {
    await this.firstLocation.click();
  }

  async selectDate() {
    await this.firstOpenDate.click();
  }

  async selectTime() {
    await this.firstOpenTime.click();
  }

  async submitSchedule() {
    await this.submitScheduleSelection.click()
  }
}

module.exports = SchedulePage