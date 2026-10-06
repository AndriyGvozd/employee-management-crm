import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotFoundPage extends BasePage {
  readonly code: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    super(page);
    this.code = page.getByTestId('not-found-code');
    this.message = page.getByTestId('not-found-message');
  }
}
