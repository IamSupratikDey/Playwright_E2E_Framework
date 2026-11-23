const{test, expect} = require('@playwright/test')

test('Prove that the environment variable is working', async({page})=>{
    console.log('ENV=', process.env.ENV, '| BASE URL=', process.env.BASE_URL);
     await page.goto('/client');          // relative URL uses baseURL
     await expect(page.locator('#login')).toBeVisible();
})