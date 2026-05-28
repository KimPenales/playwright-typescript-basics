import { test, expect } from '@playwright/test';

test('user can complete checkout flow', async ({ page }) => {
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

    //Check out locators
    const checkOutButton = page.getByRole('button', { name: 'Checkout' });

    const firstNameInput = page.getByPlaceholder('First Name');
    const lastNameInput = page.getByPlaceholder('Last Name');
    const zipInput = page.getByPlaceholder('Zip/Postal Code');
    const continueButton = page.locator('#continue');
    const finishButton = page.locator('#finish');

    //Check out complete locators
    const successMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
    const checkoutHeader = page.getByText('Checkout: Complete!');

    //Product Validation locators
    const backpackProduct = page.getByRole('link', { name: 'Sauce Labs Backpack' });
    const bikeLightProduct = page.getByRole('link', { name: 'Sauce Labs Bike Light' });
    const boltShirtProduct = page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });

    //Payment information locators
    const paymentInformation = page.getByText('Payment Information');

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

    //9. Check out the added products
    await checkOutButton.click();

    //10. Validate that user is in filling customer info page
    await expect(page)
        .toHaveURL(/checkout-step-one/);

    //11. Input customer information
    await firstNameInput.fill('Kim');
    await lastNameInput.fill('Penales');
    await zipInput.fill('4120');

    //12. Click the continue button for checkout
    await continueButton.click();

    //13. Validate that the user is in check out overview
    await expect(page)
        .toHaveURL(/checkout-step-two/);
    
    //14. Validate the product name
    await expect(backpackProduct)
        .toBeVisible();
    await expect(bikeLightProduct)
        .toBeVisible();
    await expect(boltShirtProduct)
        .toBeVisible();
        
    //15. Validate payment information
    await expect(paymentInformation)
        .toBeVisible();

    //16. Click the finish button
    await finishButton.click();
    
    //17. Validate that the user is in the checkout complete page
    await expect(page)
        .toHaveURL(/checkout-complete/);

    //18. Validate success message order or checkout
    await expect(successMessage)
        .toBeVisible();
    await expect(checkoutHeader)
    .toBeVisible();
});
