import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly heading: Locator;
  readonly editButton: Locator;
  readonly firstNameInput: Locator;
  readonly role: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('profile-heading');
    this.editButton = page.getByTestId('edit-profile-button');
    this.firstNameInput = page.locator('#firstName');
    this.role = page.getByTestId('profile-role');
  }

  async open(): Promise<void> {
    await this.goto('/profile');
  }
}
