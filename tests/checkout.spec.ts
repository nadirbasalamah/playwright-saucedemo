import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CheckoutPage } from "../pages/CheckoutPage";

let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);

  await homePage.addToCart();
  await homePage.proceedToCheckout();

  checkoutPage = new CheckoutPage(page);

  await checkoutPage.proceedToCheckoutForm();

  await expect(checkoutPage.getCheckoutFormTitle()).toHaveText(
    "Checkout: Your Information"
  );
});

test("perform checkout by filling checkout form", async () => {
  await checkoutPage.fillCheckoutForm("john", "doe", "123456");

  await expect(checkoutPage.getCheckoutOverviewTitle()).toHaveText(
    "Checkout: Overview"
  );

  await checkoutPage.finishCheckout();

  await expect(checkoutPage.getCheckoutCompleteMessage()).toHaveText(
    "Thank you for your order!"
  );

  await expect(checkoutPage.getCheckoutCompleteDescription()).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  );
});

test("perform checkout without filling checkout form", async () => {
  await checkoutPage.fillCheckoutForm("", "", "");

  await expect(checkoutPage.getErrorMessage()).toHaveText(
    "Error: First Name is required"
  );
});
