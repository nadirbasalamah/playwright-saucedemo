import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
});

test("login with valid credentials", async ({ page }) => {
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  const pageTitle = homePage.getPageTitle();

  await expect(pageTitle).toHaveText("Swag Labs");
});

test("login with invalid credentials", async () => {
  await loginPage.login("wrong_user", "secret_sauce");

  const errorMessage = loginPage.getErrorMessage();

  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("login with empty credentials", async () => {
  await loginPage.login("", "");

  const errorMessage = loginPage.getErrorMessage();

  await expect(errorMessage).toHaveText("Epic sadface: Username is required");
});

test("login with locked out user", async () => {
  await loginPage.login("locked_out_user", "secret_sauce");

  const errorMessage = loginPage.getErrorMessage();

  await expect(errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});
