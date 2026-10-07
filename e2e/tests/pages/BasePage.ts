import { type Locator, type Page } from '@playwright/test';

// Matches data-testid="nav-<section>" in the header navigation
export type NavSection = 'employees' | 'projects' | 'notifications' | 'profile';

// Common parts for every page: navigation, header.
export class BasePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly toast: Locator;
  readonly toastTitle: Locator;
  readonly toastDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout-button');
    // notification shown after login / registration / errors
    this.toast = page.getByTestId('toast').first();
    this.toastTitle = this.toast.getByTestId('toast-title');
    this.toastDescription = this.toast.getByTestId('toast-description');
  }

  navLink(name: NavSection): Locator {
    return this.page.getByTestId(`nav-${name}`);
  }

  // Auth token saved by the frontend after login
  authToken(): Promise<string | null> {
    return this.page.evaluate(() => localStorage.getItem('token'));
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
