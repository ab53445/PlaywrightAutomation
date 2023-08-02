const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
// JSON -> string -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/sign_inVerifyPOMTestData.json")));

for(const data of dataset)
{

test(`Browser context Playwright test ${data.productName}`,async ({page})=>
{
    const loginPage = new LoginPage(page); 
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    console.log(await page.locator(".card-body b").first().textContent());
    await expect(page.locator(".card-body b").first()).toContainText('zara');
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

     
    
    
    
    
    page.locator("div li").first().waitFor();
    expect(page.locator(".cartSection h3").isVisible()).toBeTruthy();
    const bool = page.locator("h3:has-text('productName')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[value='4542 9931 9292 2293']").last().fill("4542 9931 9292 2293");
    await page.locator("[placeholder*='Country']").type("ind",{dealy:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0 ; i < optionsCount ; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India") // (text.includes === "India") // (text === " India")
        {
            //click the option
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    //const tt = await page.locator(".user__name [type='text']").textContent();
   // console.log(tt);
   // await expect(page.locator(".user__name [type='text']")).toHaveText(userName);
    page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});}