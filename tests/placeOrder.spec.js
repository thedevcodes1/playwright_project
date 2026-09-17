const{test, expect} = require('@playwright/test')
const validCredentials = require('../utils/validLogin.json')
const loginPage = require('../page/login')
//const placeOrderPage = require('../page/placeOrder')

test.beforeEach(async({page}) =>
{
    await page.goto('https://www.demoblaze.com/index.html')
})

test('Test 7:  Select a product -> Add to cart -> Click "ok" on the popup', async({page}) =>
{
    const login = new loginPage(page)
    await login.accessURL()
    await login.clickLoginLink()
    await login.enterUsername(validCredentials.username)
    await login.enterPassword(validCredentials.password)
    
    const placeOrderPageObj = await login.clickLoginButton()

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#nameofuser')).toHaveText('Welcome devikajayakumar', { timeout: 40000 })
   
    await placeOrderPageObj.selectProduct('Sony vaio i5')

    // add product to cart dialog pop up
    page.on('dialog', async dialog => 
    {
    expect(dialog.message()).toBe('Product added')
    await dialog.accept()
    })

    await placeOrderPageObj.addToCart()
    await placeOrderPageObj.clickCart()
    await placeOrderPageObj.placeOrder()
    await placeOrderPageObj.enterDetails() 
    await placeOrderPageObj.purchaseOrder()
    await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
}   
)

test('Test 8:  Select a product under Phones -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase.', async({page}) =>
{
    const login = new loginPage(page)
    await login.accessURL()
    await login.clickLoginLink()
    await login.enterUsername(validCredentials.username)
    await login.enterPassword(validCredentials.password)
    
    const placeOrderPageObj = await login.clickLoginButton()

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#nameofuser')).toHaveText('Welcome devikajayakumar', { timeout: 40000 })

    await placeOrderPageObj.selectCategory('Phones')
    expect(page.getByRole('link', { name: 'Phones'})).toBeVisible();

    await placeOrderPageObj.selectProduct('Samsung galaxy s6')
    await expect(page.locator('h2.name')).toHaveText('Samsung galaxy s6')

    // add product to cart dialog pop up
    page.on('dialog', async dialog => 
    {
    expect(dialog.message()).toBe('Product added')
    await dialog.accept()
    })

    await placeOrderPageObj.addToCart()
    await placeOrderPageObj.clickCart()
    await placeOrderPageObj.placeOrder()
    await placeOrderPageObj.enterDetails()
    await placeOrderPageObj.purchaseOrder()

    // await placeOrderPageObj.clickOK()
    // await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
}   
)


test('Test 9:  Select a product under monitors -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase.', async({page}) =>
{
    const login = new loginPage(page)
    await login.accessURL()
    await login.clickLoginLink()
    await login.enterUsername(validCredentials.username)
    await login.enterPassword(validCredentials.password)
    
    const placeOrderPageObj = await login.clickLoginButton()

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page.locator('#nameofuser')).toHaveText('Welcome devikajayakumar', { timeout: 40000 })

    await placeOrderPageObj.selectCategory('Monitors')
    expect(page.getByRole('link', { name: 'Monitors'})).toBeVisible()

    await placeOrderPageObj.selectProduct('Apple monitor 24')
    await expect(page.locator('h2.name')).toHaveText('Apple monitor 24')

    // add product to cart dialog pop up
    page.on('dialog', async dialog => 
    {
    expect(dialog.message()).toBe('Product added')
    await dialog.accept()
    })

    await placeOrderPageObj.addToCart()
    await placeOrderPageObj.clickCart()
    await placeOrderPageObj.placeOrder()
    await placeOrderPageObj.enterDetails()
    await placeOrderPageObj.purchaseOrder()
}   
)