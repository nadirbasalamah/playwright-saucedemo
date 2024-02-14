import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  usernameInput: string;
  passwordInput: string;
  loginButton: string;
  errorMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = "#user-name";
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = "//h3[@data-test='error']";
  }

  async openLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);

    await this.page.click(this.loginButton);
  }

  getErrorMessage(): Locator {
    return this.page.locator(this.errorMessage);
  }
}
