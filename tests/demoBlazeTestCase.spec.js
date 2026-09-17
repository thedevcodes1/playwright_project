const {test,expect} = require('@playwright/test')
const credentials = require('../utils/validLogin.json')

test.beforeEach(async({page}) =>
{
    await page.goto('https://www.demoblaze.com/index.html')
})

// Test passed
test('Test 1: Click Sign Up', async({page}) =>
{
    await page.pause()
    await page.locator('#signin2').click()

    await page.pause()
    await page.locator('#sign-username').fill('devikajayakumar')

    await page.pause()
    await page.locator('#sign-password').fill('devikanair123')

    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('Sign up successful.')
    await dialog.accept()
    })

    await page.pause()
    await page.locator('//button[@onclick="register()"]').click()

}   
)

// Test passed
test('Test 2: Click Close', async({page}) =>
{
    //await page.pause()
    await page.locator('#signin2').click()

    //await page.pause()
    await page.locator('#sign-username').fill(credentials.username)

    //await page.pause()
    await page.locator('#sign-password').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@class="btn btn-secondary"]').nth(1).click() // 'Close' text is at index 2, so nth(1)

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')

}   
)

// Test passed
test('Test 3: Verify Login With Valid Credentials', async({page}) =>
{
    //await page.pause()
    await page.locator('#login2').click()

    //await page.pause()
    await page.locator('#loginusername').fill(credentials.username)

    //await page.pause()
    await page.locator('#loginpassword').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@onclick="logIn()"]').click()

    //await page.pause()
    await expect(page.locator('#nameofuser')).toBeVisible()
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')

}   
)

test('Test 4: Verify Login With invalid username and valid password', async({page}) =>
{
    await page.locator('#login2').click()

    await page.locator('#loginusername').fill('devikajayakumar1')

    await page.locator('#loginpassword').fill('devikanairjayakumar')
   
    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('User does not exist.')
    await dialog.accept()
    })
    
    await page.locator('//button[@onclick="logIn()"]').click()
}   
)

test('Test 5: Verify Login With valid username and invalid password', async({page}) =>
{
    await page.locator('#login2').click()

    await page.locator('#loginusername').fill('devikajayakumar')

    await page.locator('#loginpassword').fill('devikanair')
   
    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('Wrong password.')
    await dialog.accept()
    })
    
    await page.locator('//button[@onclick="logIn()"]').click()
}   
)

test('Test 6: Verify Login With invalid username and invalid password', async({page}) =>
{
    await page.locator('#login2').click()

    await page.locator('#loginusername').fill('devikajayakumar1')

    await page.locator('#loginpassword').fill('devikanair')
   
    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('User does not exist.')
    await dialog.accept()
    })
    
    await page.locator('//button[@onclick="logIn()"]').click()
}   
)

test('Test 7:  Select a product -> Add to cart -> Click "ok" on the popup', async({page}) =>
{
    await page.locator('#login2').click()
    //await page.pause()

    await page.locator('#loginusername').fill(credentials.username)

    await page.locator('#loginpassword').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@onclick="logIn()"]').click()

    expect(page).toHaveURL('https://www.demoblaze.com/index.html')
   
    //await page.pause()
    await page.locator('//a[text()="Samsung galaxy s6"]').nth(0).click()
    //await page.getByRole('link', { name: 'Samsung galaxy s6' }).click()
    //await page.getByText('Samsung galaxy s6').click()
    //await page.locator('.hrefch', { hasText: 'Samsung galaxy s6' }).click()
    //await page.locator('a[href="prod.html?idp_=1"]').getByText('Samsung galaxy s6').click()
    //await page.getByText('Samsung galaxy s6').click()

    //await page.pause()

    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('Product added')
    await dialog.accept()
    })

    //await page.pause()
    await page.locator('//a[@class="btn btn-success btn-lg"]').click()

    //await page.pause()
}   
)

test('Test 8:  Select a product under Phones -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase.', async({page}) =>
{
    //await page.pause()
    await page.locator('#login2').click()
    
    //await page.pause()
    await page.locator('#loginusername').fill(credentials.username)
    await page.locator('#loginpassword').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@onclick="logIn()"]').click()

    expect(page).toHaveURL('https://www.demoblaze.com/index.html')

    //await page.pause()
    await page.getByText('Phones').click()
    expect(page).toHaveURL('https://www.demoblaze.com/index.html#')
   
    //await page.pause()
    await page.locator('//a[text()="Samsung galaxy s6"]').nth(0).click()
    expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1s')
    //await page.getByRole('link', { name: 'Samsung galaxy s6' }).click()
    //await page.getByText('Samsung galaxy s6').click()
    //await page.locator('.hrefch', { hasText: 'Samsung galaxy s6' }).click()
    //await page.locator('a[href="prod.html?idp_=1"]').getByText('Samsung galaxy s6').click()
    //await page.getByText('Samsung galaxy s6').click()

    //await page.pause()
    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('Product added.')
    await dialog.accept()
    })

    //await page.pause()
    await page.locator('//a[@class="btn btn-success btn-lg"]').click()

    //await page.pause()
    await page.locator('#cartur').click()
    expect(page).toHaveURL('https://www.demoblaze.com/cart.html')

    //await page.pause()
    await page.locator('//button[@class="btn btn-success"]').click()

    //await page.pause()
    await page.locator('#name').fill('Devika')
    await page.locator('#country').fill('India')
    await page.locator('#city').fill('Kottayam')
    await page.locator('#card').fill('1245 6379 4697')
    await page.locator('#month').fill('March')
    await page.locator('#year').fill('2030')

    //await page.pause()
    await page.locator('//button[@onclick="purchaseOrder()"]').click()

    //await page.pause()
    await page.locator('//button[@class="confirm btn btn-lg btn-primary"]').click()

    //await page.pause()
}   
)


test('Test 9:  Select a product under monitors -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase.', async({page}) =>
{
    //await page.pause()
    await page.locator('#login2').click()
    
    //await page.pause()
    await page.locator('#loginusername').fill(credentials.username)
    await page.locator('#loginpassword').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@onclick="logIn()"]').click()

    expect(page).toHaveURL('https://www.demoblaze.com/index.html')

    //await page.pause()
    await page.getByText('Monitors').click()
    expect(page).toHaveURL('https://www.demoblaze.com/index.html#')
   
    //await page.pause()
    await page.locator('//a[text()="ASUS Full HD"]').nth(0).click()
    //await page.getByRole('link', { name: 'Samsung galaxy s6' }).click()
    //await page.getByText('Samsung galaxy s6').click()
    //await page.locator('.hrefch', { hasText: 'Samsung galaxy s6' }).click()
    //await page.locator('a[href="prod.html?idp_=1"]').getByText('Samsung galaxy s6').click()
    //await page.getByText('Samsung galaxy s6').click()
    expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=14')

    //await page.pause()
    page.on('dialog', async dialog => {
    await page.pause()
    expect(dialog.message()).toBe('Product added.')
    await dialog.accept()
    })

    //await page.pause()
    await page.locator('//a[@class="btn btn-success btn-lg"]').click()

    //await page.pause()
    await page.locator('#cartur').click()
    expect(page).toHaveURL('https://www.demoblaze.com/cart.html')

    //await page.pause()
    await page.locator('//button[@class="btn btn-success"]').click()

    //await page.pause()
    await page.locator('#name').fill('Devika')
    await page.locator('#country').fill('India')
    await page.locator('#city').fill('Kottayam')
    await page.locator('#card').fill('1245 6379 4697')
    await page.locator('#month').fill('March')
    await page.locator('#year').fill('2030')

    //await page.pause()
    await page.locator('//button[@onclick="purchaseOrder()"]').click()

    //await page.pause()
    await page.locator('//button[@class="confirm btn btn-lg btn-primary"]').click()

    //await page.pause()
}   
)

test.only('Test 10: Login With Valid Credentials --> Log Out', async({page}) =>
{
    //await page.pause()
    await page.locator('#login2').click()

    //await page.pause()
    await page.locator('#loginusername').fill(credentials.username)

    //await page.pause()
    await page.locator('#loginpassword').fill(credentials.password)

    //await page.pause()
    await page.locator('//button[@onclick="logIn()"]').click()

    //await page.pause()
    expect(page).toHaveURL('https://www.demoblaze.com/index.html')

    await page.locator('#logout2').click()

}   
)