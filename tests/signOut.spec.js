const{test, expect} = require('@playwright/test')
const logInPage = require('../page/login')
const logOutPage = require('../page/logout')
const credentials = require('../utils/validLogin.json')

test('Signout: ', async({page}) => 
{
    const login = new logInPage(page)
    await login.accessURL()
    await login.clickLoginLink()
    await login.enterUsername(credentials.username)
    await login.enterPassword(credentials.password)
    await login.clickLoginButton()
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#nameofuser')).toHaveText('Welcome devikajayakumar', { timeout: 15000 })

    const logout = new logOutPage(page)
    await logout.clickLogoutLink()
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#signin2')).toBeVisible()
    await expect(page.locator('#nameofuser')).not.toBeVisible()
}
)