class HomePage {

  constructor(page) {
    /**
    * @param {import('@playwright/test').Page} page
    */
    this.page = page;
    this.bookScanButton = page.getByRole('button', { name: 'Book a scan' });
    this.mriSpineCardTitle = page.locator('p.h4', { hasText: 'MRI Scan with Spine' });
    this.rescheduleCancelButton = page.locator('p.h4', { hasText: 'MRI Scan with Spine' });



  }

  async proceedToScanSelection() {
    await this.bookScanButton.click();
  }
}

module.exports = HomePage