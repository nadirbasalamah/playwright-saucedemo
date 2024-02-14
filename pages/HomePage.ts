import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  pageTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = ".app_logo";
  }

  getPageTitle(): Locator {
    return this.page.locator(this.pageTitle);
  }
}
