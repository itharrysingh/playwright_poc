const { test, expect } = require('@playwright/test');
const creds = require('../tests/credentials.json');
const LoginPage = require('./pages/LoginPage');
const ScanSelectionPage = require('./pages/ScanSelectionPage');
const HomePage = require('./pages/HomePage');
const SchedulePage = require('./pages/SchedulePage');
const AppointmentReservationPage = require('./pages/AppointmentReservationPage');



test.describe('Booking tests', () => {

    test(`TC_04 - Verify successful booking using valid Stripe card - MRI`, async ({ page }) => {

        await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login(creds.validUsers[0].user, creds.validUsers[0].pass);

        const homePage = new HomePage(page);
        await homePage.proceedToScanSelection();

        const scanSelectionPage = new ScanSelectionPage(page);
        //await scanSelectionPage.enterBirthdate('04171990');
        //await scanSelectionPage.selectGender('Female');
        await scanSelectionPage.selectMri();
        await scanSelectionPage.goToScheduleScan();

        const schedulePage = new SchedulePage(page);
        await schedulePage.selectLocation();
        await schedulePage.selectDate();
        await schedulePage.selectTime();
        await schedulePage.submitSchedule();

        const appointmentReservationPage = new AppointmentReservationPage(page);
        await appointmentReservationPage.fillPaymentCC('5555555555554444');
        await appointmentReservationPage.fillPaymentExpirationDate('1050');
        await appointmentReservationPage.fillPaymentSecurityCode('764');
        await appointmentReservationPage.selectCountry('US');
        await appointmentReservationPage.fillPaymentZipcode('76063');
        await appointmentReservationPage.clickContinue();


        await expect(appointmentReservationPage.confirmationContainer).toBeVisible();
        await expect(appointmentReservationPage.confirmationContainerScanType).toBeVisible();

        await page.close();
    });

    test(`TC_05 - Ensure declined payment does not create confirmed booking`, async ({ page }) => {

        await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login(creds.validUsers[0].user, creds.validUsers[0].pass);

        const homePage = new HomePage(page);
        await homePage.proceedToScanSelection();

        const scanSelectionPage = new ScanSelectionPage(page);
        //await scanSelectionPage.enterBirthdate('04171990');
        //await scanSelectionPage.selectGender('Female');
        await scanSelectionPage.selectMri();
        await scanSelectionPage.goToScheduleScan();

        const schedulePage = new SchedulePage(page);
        await schedulePage.selectLocation();
        await schedulePage.selectDate();
        await schedulePage.selectTime();
        await schedulePage.submitSchedule();

        const appointmentReservationPage = new AppointmentReservationPage(page);
        await appointmentReservationPage.fillPaymentCC('4000000000000002');
        await appointmentReservationPage.fillPaymentExpirationDate('1050');
        await appointmentReservationPage.fillPaymentSecurityCode('764');
        await appointmentReservationPage.selectCountry('US');
        await appointmentReservationPage.fillPaymentZipcode('76063');
        await appointmentReservationPage.clickContinue();

        await expect(appointmentReservationPage.cardDeclineError).toHaveText('Your card was declined.');


        await page.close();
    });

    test('TC_06 - Verify member cannot access another member’s booking', async ({ browser }) => {

        //
        // USER A — Book MRI with Spine

        const contextA = await browser.newContext();
        const pageA = await contextA.newPage();

        await pageA.goto('/');

        const loginPageA = new LoginPage(pageA);
        await loginPageA.login(creds.validUsers[0].user, creds.validUsers[0].pass);

        const homePageA = new HomePage(pageA);
        await homePageA.proceedToScanSelection();

        const scanSelectionPage = new ScanSelectionPage(pageA);
        // await scanSelectionPage.enterBirthdate('04171990');
        // await scanSelectionPage.selectGender('Female');
        await scanSelectionPage.selectMriSpine();
        await scanSelectionPage.goToScheduleScan();

        const schedulePage = new SchedulePage(pageA);
        await schedulePage.selectLocation();
        await schedulePage.selectDate();
        await schedulePage.selectTime();
        await schedulePage.submitSchedule();

        const appointmentReservationPage = new AppointmentReservationPage(pageA);
        await appointmentReservationPage.fillPaymentCC('5555555555554444');
        await appointmentReservationPage.fillPaymentExpirationDate('1050');
        await appointmentReservationPage.fillPaymentSecurityCode('764');
        await appointmentReservationPage.selectCountry('US');
        await appointmentReservationPage.fillPaymentZipcode('76063');
        await appointmentReservationPage.clickContinue();


        await expect(appointmentReservationPage.confirmationContainer).toBeVisible();
        await expect(appointmentReservationPage.confirmationContainerScanType).toBeVisible();

        await contextA.close();



        // USER B — Should NOT see User A’s booking

        const contextB = await browser.newContext();
        const pageB = await contextB.newPage();

        await pageB.goto('/');

        const loginPageB = new LoginPage(pageB);
        await loginPageB.login(creds.validUsers[1].user, creds.validUsers[1].pass);

        const homePageB = new HomePage(pageB);

        // Wait for home page load and verify elements are absent
        await expect(homePageB.mriSpineCardTitle).not.toBeVisible();
        await expect(homePageB.rescheduleCancelButton).not.toBeVisible();

        await contextB.close();
    });

})
