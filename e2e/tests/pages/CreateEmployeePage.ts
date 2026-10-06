import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CreateEmployeePage extends BasePage {
  readonly title: Locator;
  readonly firstName: Locator;
  readonly email: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('create-employee-title');
    this.firstName = page.locator('#firstName');
    this.email = page.locator('#email');
  }
}
