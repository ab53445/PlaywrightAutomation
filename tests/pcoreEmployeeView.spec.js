const {test, expect} = require('@playwright/test');
const {PcoreLoginPage} = require('../pageobjects/PcoreLoginPage');
const {PcoreHomePage} = require('../pageobjects/PcoreHomePage');

test('View employee details in Pcore',async({page})=>
    {
        const loginPage = new PcoreLoginPage(page); 
        const homePage = new PcoreHomePage(page);
        await loginPage.goTo();
        await loginPage.validLogin("priyanka.agarwal","Priyanka@67#");
        await expect(page.locator("a.topicn").first()).toContainText('Home');
        await homePage.goToHome();
        expect(page.locator("#PCIMenut0").isVisible()).toBeTruthy();
        const framePage = page.frameLocator("[name = 'contents']");
        await framePage.locator("#PCIMenut12").click();
        await framePage.locator("#PCIMenut14").click();
        const frameMainPage = page.frameLocator("[name = 'main']");
        //expect(await frameMainPage.locator("#txtFName").getAttribute("value").includes("Priyanka")).toBeTruthy();
        const empName = await frameMainPage.locator("#txtFName").getAttribute("value");
        console.log(empName);
        expect(empName.includes("Priyanka")).toBeTruthy();

    })