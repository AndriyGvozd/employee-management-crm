import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotificationsPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('notifications-heading');
  }

  async open(): Promise<void> {
    await this.goto('/notifications');
  }
}
