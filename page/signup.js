const newCredentials = require('../utils/signupCred.json')

class SignUp{

    constructor(page){
        this.page = page
        this.signUpLink = page.locator('#signin2') 
        this.usernameFill = page.locator('#sign-username')
        this.passwordFill = page.locator('#sign-password')
        this.signUpButton = page.locator('//button[@onclick="register()"]')
        this.closeButton = page.getByText('Close')
    }

    async accessURL()
    {
        await this.page.goto('https://www.demoblaze.com/index.html')
    }

    async clickSignUpLink()
    {       
        await this.signUpLink.click()
        return this
    }

    async enterUsername()
    {
        await this.usernameFill.fill(newCredentials.username)
        return this
    }

    async enterPassword()
    {
        await this.passwordFill.fill(newCredentials.password)
        return this
    }

    async clickSignUpButton()
    {
        await this.signUpButton.click()
        return this
    }

    async clickCloseButton()
    {
        await this.closeButton.nth(1).click()
        return this
    }

}
module.exports = SignUp
