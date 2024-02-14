import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

test("add item to the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);

  await homePage.addToCart();
  const cartItemCounter = homePage.getCartItemCounter();

  expect(cartItemCounter).toHaveText("1");
});

test("remove item from the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);

  await homePage.addToCart();
  await homePage.removeFromCart();
});
