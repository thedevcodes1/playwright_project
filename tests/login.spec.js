const{test,expect} = require('@playwright/test')
const validCredentials = require('../utils/validLogin.json')
const invalidCredentials = require('../utils/invalidLogin.json')
const logInPage = require('../page/login')

test.beforeEach(async({page}) =>
{
    await page.goto('https://www.demoblaze.com/index.html')
})

// Test : Login using valid credentials
test.only('Valid Credentials', async({page}) =>
{
    const validLogin = new logInPage(page)
    await validLogin.accessURL()
    await validLogin.clickLoginLink()
    await validLogin.enterUsername(validCredentials.username)
    await validLogin.enterPassword(validCredentials.password)
    const placeOrder = await validLogin.clickLoginButton()

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#nameofuser')).toHaveText('Welcome devikajayakumar', { timeout: 50000 })
}   
)

// Testing all 3 invalid username and password set
    test(`Invalid username and valid password - ${invalidCredentials[0].username} & ${invalidCredentials[0].password}`, async({page}) =>
    {
        const invalidLogin = new logInPage(page)
        await invalidLogin.accessURL()
        await invalidLogin.clickLoginLink()
        await invalidLogin.enterUsername(invalidCredentials[0].username)
        await invalidLogin.enterPassword(invalidCredentials[0].password)
        
        page.on('dialog', async dialog => 
        {
            expect(dialog.message()).toBe('User does not exist.')
            await dialog.accept()
        })
        
        await invalidLogin.clickLoginButton()
    }   
    )

    test(`Valid username and invalid password - ${invalidCredentials[1].username} & ${invalidCredentials[1].password}`, async({page}) =>
    {
        const invalidLogin2 = new logInPage(page)
        await invalidLogin2.accessURL()
        await invalidLogin2.clickLoginLink()
        await invalidLogin2.enterUsername(invalidCredentials[1].username)
        await invalidLogin2.enterPassword(invalidCredentials[1].password)
        
        page.on('dialog', async dialog => 
        {
            expect(dialog.message()).toBe('Wrong password.')
            await dialog.accept()
        })
        
        await invalidLogin2.clickLoginButton()
    }   
    )

    test(`Invalid username and invalid password - ${invalidCredentials[2].username} & ${invalidCredentials[2].password}`, async({page}) =>
    {
        const invalidLogin3 = new logInPage(page)
        await invalidLogin3.accessURL()
        await invalidLogin3.clickLoginLink()
        await invalidLogin3.enterUsername(invalidCredentials[2].username)
        await invalidLogin3.enterPassword(invalidCredentials[2].password)
        
        page.on('dialog', async dialog => 
        {
            expect(dialog.message()).toBe('User does not exist.')
            await dialog.accept()
        })
        
        await invalidLogin3.clickLoginButton()
    }   
    )