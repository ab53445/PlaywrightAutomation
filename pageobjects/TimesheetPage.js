class TimeSheetPage
{
    constructor (page)
    {
        this.page = page;

    }

    async showReport()
    {
        await this.page.locator("#BtnReport").click();
    }
}
module.exports = {TimeSheetPage};