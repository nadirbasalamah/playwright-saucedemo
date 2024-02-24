import { Locator, Page } from "@playwright/test";

export class ProductPage {
  page: Page;
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  addToCartButton: string;

  constructor(page: Page) {
    this.page = page;
    this.productImage = ".inventory_details_img";
    this.productName = ".inventory_details_name";
    this.productDescription = ".inventory_details_desc";
    this.productPrice = ".inventory_details_price";
    this.addToCartButton = ".btn.btn_primary.btn_small.btn_inventory";
  }

  getProductImage(): Locator {
    return this.page.locator(this.productImage);
  }

  getProductName(): Locator {
    return this.page.locator(this.productName);
  }

  getProductDescription(): Locator {
    return this.page.locator(this.productDescription);
  }

  getProductPrice(): Locator {
    return this.page.locator(this.productPrice);
  }

  getAddToCartButton(): Locator {
    return this.page.locator(this.addToCartButton);
  }
}
