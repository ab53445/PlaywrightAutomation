class DashboardPage
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName)
    {
        
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const prod_num = await this.products.count();    
    for(let i =0; i<prod_num; ++i)
    {
       if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }
}
module.exports = {DashboardPage};
