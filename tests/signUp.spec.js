const{test, expect} = require('@playwright/test')
const signUpPage = require('../page/signup')
//const newCredentials = require('../utils/signupCred.json')
const {faker} = require('@faker-js/faker')

test.beforeEach(async({page}) =>
{
    await page.goto('https://www.demoblaze.com/index.html')
})

// Test 1 --> New User Sign Up
test('Test 1: Click Sign Up', async({page}) =>
{
    const signUpObj = new signUpPage(page)
    await signUpObj.accessURL()
    await signUpObj.clickSignUpLink()

    // random generator username and password generator
    const username = 'user' + Date.now()
    const password = 'password' + Date.now()
    console.log(username, password)
    await signUpObj.enterUsername(username)
    await signUpObj.enterPassword(password)

    page.on('dialog', async dialog => {
    //await page.pause()
    expect(dialog.message()).toBe('Sign up successful.')
    await dialog.accept()
    })

    //await page.pause()
    await signUpObj.clickSignUpButton()

    //assertion
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
}   
)

// Test 2 --> Click sign up link and click close
test.only('Test 2: Click Close', async({page}) =>
{
    const signUpObj = new signUpPage(page)
    await signUpObj.accessURL()
    //await page.pause()
    await signUpObj.clickSignUpLink()

    // generate random data by faker class
    const username = faker.internet.username()
    const password = faker.internet.password({length: 10})
    console.log(username, password)
    await signUpObj.enterUsername(username)
    await signUpObj.enterPassword(password)
    //await page.pause()
    await signUpObj.clickCloseButton()

    // assertion
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
}   
)
