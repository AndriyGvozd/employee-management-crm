import { type Locator, type Page } from '@playwright/test';

// Matches data-testid="nav-<section>" in the header navigation
export type NavSection = 'employees' | 'projects' | 'notifications' | 'profile';

// Common parts for every page: navigation, header.
export class BasePage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout-button');
  }

  navLink(name: NavSection): Locator {
    return this.page.getByTestId(`nav-${name}`);
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openSection(name: NavSection): Promise<void> {
    await this.navLink(name).click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
