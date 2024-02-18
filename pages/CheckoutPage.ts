import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  checkoutButton: string;
  checkoutFormTitle: string;
  firstNameInput: string;
  lastNameInput: string;
  zipcodeInput: string;
  continueCheckoutButton: string;
  errorMessage: string;
  checkoutOverviewTitle: string;
  finishCheckoutButton: string;
  checkoutCompleteMessage: string;
  checkoutCompleteDescription: string;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = "#checkout";
    this.checkoutFormTitle = ".title";
    this.firstNameInput = "#first-name";
    this.lastNameInput = "#last-name";
    this.zipcodeInput = "#postal-code";
    this.continueCheckoutButton = "#continue";
    this.errorMessage = '//h3[@data-test="error"]';
    this.checkoutOverviewTitle = ".title";
    this.finishCheckoutButton = "#finish";
    this.checkoutCompleteMessage = ".complete-header";
    this.checkoutCompleteDescription = ".complete-text";
  }

  async proceedToCheckoutForm() {
    await this.page.click(this.checkoutButton);
  }

  getCheckoutFormTitle(): Locator {
    return this.page.locator(this.checkoutFormTitle);
  }

  async fillCheckoutForm(firstname: string, lastname: string, zipcode: string) {
    await this.page.fill(this.firstNameInput, firstname);
    await this.page.fill(this.lastNameInput, lastname);
    await this.page.fill(this.zipcodeInput, zipcode);

    await this.page.click(this.continueCheckoutButton);
  }

  getErrorMessage(): Locator {
    return this.page.locator(this.errorMessage);
  }

  getCheckoutOverviewTitle(): Locator {
    return this.page.locator(this.checkoutOverviewTitle);
  }

  async finishCheckout() {
    await this.page.click(this.finishCheckoutButton);
  }

  getCheckoutCompleteMessage(): Locator {
    return this.page.locator(this.checkoutCompleteMessage);
  }

  getCheckoutCompleteDescription(): Locator {
    return this.page.locator(this.checkoutCompleteDescription);
  }
}
