//test to fake response from playwright and then render on browser
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "priyankaa8@gmail.com", userPassword: "Priyanka@67#" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
const fakePayloadOrders = {data:[],message:"No Orders"};
let response;

test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(() => {

});

test('Place the Order', async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token
    );

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64afce1a7244490f957e232c",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = fakePayloadOrders;
        route.fulfill(
            {
                response,
                body,
            }
        )
        //intercepting response - API response ->fake response by playwright-> browser -> render data for output fake response by playwright->
    });
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    console.log(await page.locator(".mt-4").textContent());
    await page.locator("tbody").waitFor();
});