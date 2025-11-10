class ScanSelectionPage {


    constructor(page) {
      this.page = page;
      this.birthdateField = page.locator('#dob');
      this.genderDropdown = page.locator('svg.multiselect__select');
      this.dropdownOption = (sex) => 
        page.locator('.multiselect__content li', { hasText: sex });
      this.mri = page.locator('ul.content-container.encounters-container li').nth(0);
      this.mriSpine = page.locator('p.encounter-title.h4',  { hasText: 'MRI Scan with Spine' }).first();
      this.mriSkeletalNeuro = page.locator('p.encounter-title.h4', { hasText: 'MRI Scan with Skeletal and Neurological Assessment' });
      this.ctScan = page.locator('p.encounter-title.h4', { hasText: 'Heart & Lungs CT Scan' });
      this.submitButton = '[data-test="submit"]';
      
    }
  
    async enterBirthdate(birthdate) {
      await this.birthdateField.click();
      await this.birthdateField.fill('');
      await this.birthdateField.fill(birthdate),{ force: true };
    }
    
    async selectGender(sex) {
      await this.genderDropdown.click();
      await this.dropdownOption(sex).click();
      
      
    }

    async selectMri() {
      await this.mri.click();
      
    }

    async selectMriSpine() {
      await this.mriSpine.click();
      
    }

    async selectMriSkeletalNeuro() {
      await this.mriSkeletalNeuro.click()
      
    }

    async selectCtScan() {
      await this.ctScan.click()
      
    }
  
    async goToScheduleScan() {
      await this.page.click(this.submitButton)
    }
  }
  
  module.exports = ScanSelectionPage