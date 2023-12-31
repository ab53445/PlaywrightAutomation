const {test,expect} = require ('@playwright/test')

test("Popup Validations", async({page})=>
{
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        //await page.goto("http://google.com");
        //await page.goBack();
        //await page.goForward();
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        //await page.pause();
        page.on('dialog',dialog => dialog.accept())
        //page.on('dialog',dialog => dialog.dismiss())
        await page.locator("#confirmbtn").click();
        await page.locator("#mousehover").hover();
        const framesPage = page.frameLocator("#courses-iframe");
        await framesPage.locator("li a[href*='lifetime-access']:visible").click();
        const textCheck = await framesPage.locator(".text h2").textContent();
        console.log(textCheck.split(" ")[1]);


        //await page.pause();

})

test("Screenshots & Visual comparisions", async({page}) => 
{
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#displayed-text").screenshot({path : 'partialscreenshot.png'});
        await page.locator("#hide-textbox").click();
        await page.screenshot({path: 'screenshot.png'});
        await expect(page.locator("#displayed-text")).toBeHidden();

});
//screenshot - store -> to compare visually afterwards with other screenshot
/*test.only('visual testing with playwright', async({page})=>
{
        await page.goto("https://google.com");
        expect(await page.screenshot({path: 'newScreenshot.png'})).toMatchSnapshot('landingPage.png');
}
)*/