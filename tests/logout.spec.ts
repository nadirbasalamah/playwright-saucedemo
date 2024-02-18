import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("logout", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);

  await homePage.clickBurgerMenu();
  await homePage.logout();

  const pageTitle = loginPage.getPageTitle();

  await expect(pageTitle).toHaveText("Swag Labs");
});
