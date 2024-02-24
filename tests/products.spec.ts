import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

test("view all products", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  const pageTitle = homePage.getPageTitle();

  await expect(pageTitle).toHaveText("Swag Labs");

  const productsCard = await homePage.getProductsCard();

  for (const card of productsCard) {
    // check if product image is visible
    await expect(card.getByRole("img")).toBeVisible();

    // check if product title is visible
    await expect(card.locator(".inventory_item_name")).toBeVisible();
    await expect(card.locator(".inventory_item_name")).not.toBeEmpty();

    // check if product desc is visible
    await expect(card.locator(".inventory_item_desc")).toBeVisible();
    await expect(card.locator(".inventory_item_desc")).not.toBeEmpty();

    // check if product price is visible
    await expect(card.locator(".inventory_item_price")).toBeVisible();
    await expect(card.locator(".inventory_item_price")).not.toBeEmpty();

    // check if add to card button is visible
    await expect(card.getByRole("button")).toBeVisible();
    await expect(card.getByRole("button")).toHaveText("Add to cart");
    await expect(card.getByRole("button")).toBeEnabled();
  }
});

test("view all products without login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  const loginPage = new LoginPage(page);

  const errorMessage = loginPage.getErrorMessage();

  await expect(errorMessage).toHaveText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
});

test("view product details with valid product ID", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);

  await homePage.openProductDetail();

  const productPage = new ProductPage(page);

  await expect(productPage.getProductImage()).toBeVisible();

  await expect(productPage.getProductName()).toBeVisible();
  await expect(productPage.getProductName()).not.toBeEmpty();

  await expect(productPage.getProductDescription()).toBeVisible();
  await expect(productPage.getProductDescription()).not.toBeEmpty();

  await expect(productPage.getProductPrice()).toBeVisible();
  await expect(productPage.getProductPrice()).not.toBeEmpty();

  await expect(productPage.getAddToCartButton()).toBeVisible();
  await expect(productPage.getAddToCartButton()).toHaveText("Add to cart");
  await expect(productPage.getAddToCartButton()).toBeEnabled();
});

test("view product details with valid product ID without login", async ({
  page,
}) => {
  const productId = 4;

  await page.goto(
    `https://www.saucedemo.com/inventory-item.html?id=${productId}`
  );

  const loginPage = new LoginPage(page);

  const errorMessage = loginPage.getErrorMessage();

  await expect(errorMessage).toHaveText(
    "Epic sadface: You can only access '/inventory-item.html' when you are logged in."
  );
});

test("view product details with invalid product ID", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const productId = -1;

  await page.goto(
    `https://www.saucedemo.com/inventory-item.html?id=${productId}`
  );

  const productPage = new ProductPage(page);

  await expect(productPage.getProductImage()).toBeVisible();

  await expect(productPage.getProductName()).toBeVisible();
  await expect(productPage.getProductName()).not.toBeEmpty();
  await expect(productPage.getProductName()).toHaveText("ITEM NOT FOUND");
});
