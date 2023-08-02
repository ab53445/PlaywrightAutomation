const {test, expect} = require('@playwright/test');
const {PcoreLoginPage} = require('../pageobjects/PcoreLoginPage');
const {PcoreHomePage} = require('../pageobjects/PcoreHomePage');
//const {TimeSheetPage} = require('../pageobjects/TimeSheetPage');

test('View attendance of employee in Pcore',async({page})=>
    {
        const loginPage = new PcoreLoginPage(page); 
        const homePage = new PcoreHomePage(page);
        await loginPage.goTo();
        await loginPage.validLogin("priyanka.agarwal","Priyanka@67#");
        await expect(page.locator("a.topicn").first()).toContainText('Home');
        await homePage.goToHome();
        expect(page.locator("#PCIMenut0").isVisible()).toBeTruthy();
        const framePage = page.frameLocator("[name = 'contents']");
        await framePage.locator("#PCIMenut19").click();
        await framePage.locator("#PCIMenut27").click();
        const frameMainPage = page.frameLocator("[name = 'main']");
        await expect(page.locator(".header").isVisible()).toBeTruthy();
        //await frameMainPage.locator("#BtnReport").click();
        await frameMainPage.locator("#BtnReport").click();
        expect(frameMainPage.getByText("Employee Name").isVisible()).toBeTruthy();
        expect(frameMainPage.locator("td [bgcolor='Green']").isVisible()).toBeTruthy();
        await page.waitForLoadState('domcontentloaded');
        await page.pause();
       // const timesheetpage = new TimeSheetPage(frameMainPage);
        //timesheetpage.showReport();

    });