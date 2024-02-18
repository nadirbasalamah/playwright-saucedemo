import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  pageTitle: string;
  addToCartButton: string;
  removeFromCartButton: string;
  cartItemCounter: string;
  burgerMenuButton: string;
  logoutButton: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = ".app_logo";
    this.addToCartButton = "#add-to-cart-sauce-labs-backpack";
    this.removeFromCartButton = "#remove-sauce-labs-backpack";
    this.cartItemCounter = ".shopping_cart_badge";
    this.burgerMenuButton = "#react-burger-menu-btn";
    this.logoutButton = "#logout_sidebar_link";
  }

  getPageTitle(): Locator {
    return this.page.locator(this.pageTitle);
  }

  async clickBurgerMenu() {
    await this.page.click(this.burgerMenuButton);
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async removeFromCart() {
    await this.page.click(this.removeFromCartButton);
  }

  getCartItemCounter(): Locator {
    return this.page.locator(this.cartItemCounter);
  }
}
