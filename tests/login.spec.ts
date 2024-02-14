import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  const pageTitle = homePage.getPageTitle();

  await expect(pageTitle).toHaveText("Swag Labs");
});
