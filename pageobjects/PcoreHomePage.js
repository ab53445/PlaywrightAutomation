class PcoreHomePage
{
    constructor(page)
    {
        this.page = page;
        this.home = page.getByText(' Home ');

    }

    async goToHome()
    {
        await this.home.click();

    }

    async selectEmployee(page)
    {
        
    }
}module.exports = {PcoreHomePage};
