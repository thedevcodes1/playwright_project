const logOut = require('../page/logout')
const placeOrder = require('../page/placeOrder')

class PlaceOrder
{
    constructor(page){
        this.page = page
       
        //this.product = page.locator('//a[text()="${product}"]')
        this.categoryPhones = page.getByText('Phones')
        this.categoryMonitors = page.getByText('Monitors')
        this.categoryLaptops = page.getByText('Laptops')
        this.toCart = page.locator('//a[text()="Add to cart"]')
        this.cart = page.locator('#cartur')
        this.orderPlaced = page.locator('//button[text()="Place Order"]')
        this.name =  page.locator('#name')
        this.country = page.locator('#country')
        this.city = page.locator('#city')
        this.card = page.locator('#card')
        this.month = page.locator('#month')
        this.year = page.locator('#year')
        this.purchase = page.locator('//button[@onclick="purchaseOrder()"]')
        //this.okButton = page.locator('//button[text()="OK"]')
    }

    async accessURL()
    {
        await this.page.goto('https://www.demoblaze.com/index.html')
    }

    async selectProduct(product)
    {
        await this.page.locator(`//a[text()="${product}"]`).click()
        return this
    }

    async selectCategory(category)
    {
        await this.page.locator(`//a[text()="${category}"]`).click()
        return this
    }

    async selectLaptopsCategory()
    {
        await this.categoryLaptops.click()
        return this
    }

    async selectPhonesCategory()
    {
        await this.categoryPhones.click()
        return this
    }

    async selectMonitorsCategory()
    {
        await this.categoryMonitors.click()
        return this
    }

    async addToCart()
    {
        await this.toCart.click()
        return this
    }

    async clickCart()
    {
        await this.cart.click()
        return this
    }

    async placeOrder()
    {
        await this.orderPlaced.nth(0).click();
        return this
    }

    async enterDetails()
    {
        await this.name.fill('Devika')
        await this.country.fill('India')
        await this.city.fill('Kottayam')
        await this.card.fill('1245 6379 4697')
        await this.month.fill('March')
        await this.year.fill('2030')
        return this
    }

    async purchaseOrder()
    {
        await this.purchase.click()
        return this 
    }

    async logout()
    {
        return new logOut(this.page)
    }

    // async clickOK()
    // {
    //     await this.page.locator('//button[text()="OK"]')
    //     return this
    //     //await this.page.locator('//button[@class="confirm btn btn-lg btn-primary"]')
    // }

}

module.exports = PlaceOrder