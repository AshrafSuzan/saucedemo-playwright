const { test, expect } = require('@playwright/test');

test('saudemo logs in, add to cart, name verification and log out', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // check login successfull
  await expect(page.getByText('Products')).toBeVisible();

  // add to cart
  const productName = await page.locator('.inventory_item_name').first().textContent();
  await page.locator('button.btn_inventory').first().click();

  // cart visit
  await page.click('.shopping_cart_link');

  //varifies product name
  const cartProductName = await page.locator('.inventory_item_name').textContent();
  expect(cartProductName.trim()).toBe(productName.trim());

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  //check successfull logout
  await expect(page.locator('#login-button')).toBeVisible();
});
