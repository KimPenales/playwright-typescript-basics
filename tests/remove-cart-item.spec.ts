import { test, expect } from '@playwright/test';

test('user can remove items from cart', async ({ page }) => {
    //Login locators
    const usernameInput = page.locator('#user-name');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('#login-button');

    //Product locators
    const backpackItem = page.locator('#add-to-cart-sauce-labs-backpack');
    const bikeLightItem = page.locator('#add-to-cart-sauce-labs-bike-light');
    const boltShirtItem = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');

    //Remove button locators
    const removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
    const removeBikeLightButton = page.locator('#remove-sauce-labs-bike-light');
    const removeBoltTShirtButton = page.locator('#remove-sauce-labs-bolt-t-shirt');

    //Cart locators
    const shoppingCartBadge = page.locator('.shopping_cart_badge');
    const shoppingCartLink = page.locator('.shopping_cart_link');

    //Product Validation locators
    const backpackProduct = page.getByRole('link', { name: 'Sauce Labs Backpack' });
    const bikeLightProduct = page.getByRole('link', { name: 'Sauce Labs Bike Light' });
    const boltShirtProduct = page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });

    //1. Access the website
    await page.goto('https://www.saucedemo.com/');

    //2. Login to the website
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();

    //3. Validate that user is able to login
    await expect(page)
        .toHaveURL(/inventory/);

    //4. Add multiple products by clicking add to cart button
    await backpackItem.click();
    await bikeLightItem.click();
    await boltShirtItem.click();

    //5. Validate remove button - or text is change from add to cart to remove button
    await expect(removeBackpackButton)
        .toHaveText('Remove');
    await expect(removeBikeLightButton)
        .toHaveText('Remove');
    await expect(removeBoltTShirtButton)
        .toHaveText('Remove');

    //6. Validate the Cart count
    await expect(shoppingCartBadge)
        .toHaveText('3');

    //7. Access or open the cart
    await shoppingCartLink.click();

    //7.1 
    await expect(page)
        .toHaveURL(/cart/);

    //8. Validate products in the cart
    await expect(backpackProduct)
        .toBeVisible();
    await expect(bikeLightProduct)
        .toBeVisible();
    await expect(boltShirtProduct)
        .toBeVisible();

    //9. Remove the items to the cart
    await removeBackpackButton.click();
    await removeBikeLightButton.click();
    await removeBoltTShirtButton.click();

    //10. Validate that cart count change 
    await expect(shoppingCartBadge)
        .not.toBeVisible();
}); 

//In this testing the user can:
//-add multiple carts
//-validate the count of the added carts
//-validate the product that is added to cart
//-remove the added item or product to the cart
//-validate the count of cart is not visible (negative scenario)

//What did I do to this code?
//-Put the locators to variables const
//-Fix formatting of assertions for better readability