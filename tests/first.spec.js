const {test, expect} = require('@playwright/test');

test.only('Browser context Playwright test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    //blocking css
    //page.route('**/*.css',route=>route.abort());
    //blocking images
    //page.route('**/*{jpg,jpeg,png}',route=>route.abort());
    //listener
    page.on('request',request=> console.log(request.url()));
    page.on('response',response=> console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    //css xpath
    await userName.type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    //await signIn.click();
   // console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
    //race condition
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    );
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test',async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    //await expect(page).toHaveTitle(/.*checkout/);
    await expect(page).toHaveTitle("Google");

});
