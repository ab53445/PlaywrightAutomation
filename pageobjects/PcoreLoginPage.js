//const { expect } = require("@playwright/test");

class PcoreLoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("#pydLogin_txtUserid");
        this.password = page.locator("#pydLogin_txtUserPwd");
        this.loginButton = page.locator("#pydLogin_btnLogin");
    }

    async goTo()
    {
        await this.page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx");
    }

    async validLogin(username,password)
    {
        await this.userName.fill(username);
        await this.password.type(password);
        await this.loginButton.click();
        //await this.page.waitForLoadState('networkidle');
    }

}
module.exports = {PcoreLoginPage};
