// LOgin thorugh UI once - store in .json file
// test , cart, order, orderdetails, orderhistory

const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("priyankaa8@gmail.com");
    await page.locator("#userPassword").type("Priyanka@67#");
    page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
}
);

test('Browser context Playwright test',async ()=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const products = page.locator(".card-body");
    const productName = 'iphone 13 pro';
    const prod_num = await products.count();
    for(let i =0; i<prod_num; ++i)
    {
       if(await products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
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
});
