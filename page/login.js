const credentials = require('../utils/validLogin.json')
const placeOrder = require('../page/placeOrder')

class Login{

    constructor(page){
        this.page = page
        this.login = page.locator('#login2')
        this.username = page.locator('#loginusername')
        this.password = page.locator('#loginpassword')
        this.loginButton = page.locator('//button[@onclick="logIn()"]')
    }

    async accessURL()
    {
        await this.page.goto('https://www.demoblaze.com/index.html')
    }

    async clickLoginLink()
    {
        await this.login.click() 
        return this
    }

    async enterUsername()
    {
        await this.username.fill(credentials.username)
        return this
    }

    async enterPassword()
    {
        await this.password.fill(credentials.password)
        return this
    }

    async clickLoginButton()
    {
        await this.loginButton.click()
        return new placeOrder(this.page)
    }
}

module.exports = Login