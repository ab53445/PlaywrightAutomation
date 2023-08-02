//test anyother account order id cannot be accessed by other account
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "rahulshetty@gmail.com", userPassword: "Iamking@00" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
const fakePayloadOrders = {data:[],message:"No Orders"};
let response;


test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the Order', async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client");
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
     await page.route("https://rahulshettyacademy.com/api/ecom/ordr/get-orders-details?id=6218dad22c81249b296508b9",
    route=> route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}) )
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
});