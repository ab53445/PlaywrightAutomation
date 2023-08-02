const {test, expect} = require('@playwright/test');

test('UI Basics Playwright test',async ({page})=>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect( page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect( page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    const docLink= page.locator("[href*='documents-request']");
    await expect(docLink).toHaveAttribute("class","blinkingText");
    //await page.pause();
    //console.log(await page.title());

});

test.only('UI window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink= page.locator("[href*='documents-request']");
   
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            docLink.click(),
        ]
    )

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    //console.log(text);
    console.log(domain);
    await userName.type(domain);
    await page.pause();
    console.log(await userName.textContent());
})