class QuestionairePage {

  constructor(page) {
    this.page = page;
    this.beginQuestionaireButton = page.locator('button[class="basic normal dark"]');
    this.continueGeneralQuestionsButton = page.locator('#next');
    this.myselfButton = page.locator('div.radio--wrapper.black-white.large');
    this.iUnderstandButton = page.getByText('I understand', { exact: true });
    this.hearAboutEzraFunctionalHealth = page.getByText('Function Health', { exact: true });
    this.weightField = page.locator('input[id="weight"]');
    this.heightFeetField = page.locator('#height.heightFeet');
    this.heightInchesfield = page.locator('#height.heightInches');
    this.ethicOriginButtonAsian = page.getByText('Asian', { exact: true });
    this.addressFieldLine1 = page.locator('#memberAddress.address');
    this.cityField = page.locator('#memberAddress.city');
    this.stateDropdown = page.locator('ul.multiselect__content li span');
    this.zipcodeField = page.locator('#memberAddress.zip');
    this.governmentIDSkip = page.locator('#skip');
    this.confirmationButtonYes = page.getByText('Yes', { exact: true });
    this.primaryCareProviderNo = page.getByText('No', { exact: true });
    this.primaryCareProviderYes = page.getByText('Yes', { exact: true });

  }

  async beginMedicalQuestionaire() {
    await this.beginQuestionaireButton.click();
  }

  async continueGeneralQuestions() {
    await this.continueGeneralQuestionsButton.click();
  }

  async chooseSelf() {
    await this.myselfButton.click();
  }

  async confirmCancellationPolicy() {
    await this.iUnderstandButton.click()
  }

  async chooseFunctionHealth() {
    await this.hearAboutEzraFunctionalHealth.click()
  }

  async enterWeight(weight) {
    await this.weightField.fill(weight);
  }

  async enterHeight(heightFeet, heightInches) {
    await this.heightFeetField.fill(heightFeet);
    await this.heightInchesfield.fill(heightInches);
  }
  
  async chooseEthicOrigin(ethicOrigin) {
    if (ethicOrigin == 'Asian')
      await this.ethicOriginButtonAsian.click();
  }

  async selectState(page, stateName) {
  await page.locator('ul.multiselect__content li span', { hasText: stateName }).click();
}

  async enterCompleteAddress(addressLine1, city, state, zipcode){
    await this.addressFieldLine1.fill(addressLine1);
    await this.cityField.fill(city);
    await this.stateDropdown({hasText: state}).fill(state);
    await this.zipcodeField(zipcode);
  }
   
  async primaryCareProvider(response) {
    if (response == 'Yes')
      await this.primaryCareProviderYes.click()
    else (response == 'No')
  }

  



  
}

module.exports = QuestionairePage