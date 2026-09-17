
class Logout
{
    constructor(page)
    {
        this.page = page
        this.logoutLink = page.locator('#logout2')
    }

    async clickLogoutLink()
    {
        await this.logoutLink.click()
        return this
    }

}
module.exports = Logout