import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  pageTitle: string;
  addToCartButton: string;
  removeFromCartButton: string;
  cartItemCounter: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = ".app_logo";
    this.addToCartButton = "#add-to-cart-sauce-labs-backpack";
    this.removeFromCartButton = "#remove-sauce-labs-backpack";
    this.cartItemCounter = ".shopping_cart_badge";
  }

  getPageTitle(): Locator {
    return this.page.locator(this.pageTitle);
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
