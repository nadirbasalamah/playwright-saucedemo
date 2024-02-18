import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  homePage = new HomePage(page);

  await homePage.addToCart();
});

test("add item to the cart", async () => {
  const cartItemCounter = homePage.getCartItemCounter();
  await expect(cartItemCounter).toHaveText("1");
});

test("remove item from the cart", async () => {
  await homePage.removeFromCart();
});
