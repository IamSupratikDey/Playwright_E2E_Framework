const {test, expect} = require('../fixtures');

test('env fixture works', async ({ page, envFeature }) => {
  console.log('Running on', envFeature.name);
  await page.goto('/client');
  await expect(page.locator('#login')).toBeVisible();
});