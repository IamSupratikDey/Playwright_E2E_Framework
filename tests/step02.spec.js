const {test, expect} = require('@playwright/test')




test('verify login page loads', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/login");
     /**
      * here if I want to use class as a locator then In that case I would have written page.locator('h1.Log in')
      */
    await expect (page.getByRole('heading', {name:'Log in'})).toBeVisible(); 

});