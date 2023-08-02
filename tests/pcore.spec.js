const {test, expect} = require('@playwright/test');
const {PcoreLoginPage} = require('../pageobjects/PcoreLoginPage');
const {PcoreHomePage} = require('../pageobjects/PcoreHomePage');

test('Login to Pcore and search employee',async({page})=>
    {
        const loginPage = new PcoreLoginPage(page); 
        const homePage = new PcoreHomePage(page);
        await loginPage.goTo();
        await loginPage.validLogin("priyanka.agarwal","Priyanka@67#");
        await expect(page.locator("a.topicn").first()).toContainText('Home');
        await homePage.goToHome();
        expect(page.locator("#PCIMenut0").isVisible()).toBeTruthy();
        const framePage = page.frameLocator("[name = 'contents']");
        await framePage.locator("#PCIMenut1").click();
        expect(page.locator("#PCIMenut0").isVisible()).toBeTruthy();
        const frameMainPage = page.frameLocator("[name = 'main']");
        page.pause();
        const empDropdown= (await frameMainPage.locator("#ddlEmployeeList").selectOption("4512"));
        page.waitForLoadState('domcontentloaded');
        //const anotherDropDown = frameMainPage.locator("#ddlLevel");
    //await anotherDropDown.selectOption("1");
       // page.waitForTimeout(5000);

      // frameMainPage.locator("#trViewEmpHierarchy").click();
        //await frameMainPage.locator("#ddlEmployeeList").evaluate("document.querySelector('option[value=4512]').selected = true");
        //empDropdown
       // expect(frameMainPage.locator(".profile").isVisible()).toBeTruthy();
        
        //empDropdown.click();
        //empDropdown.selectOption("4512");
      // page.pause();
       // await homePage.goToOrgChart();
        
        //const myFrame = page.frame("main").locator();


    }
    );