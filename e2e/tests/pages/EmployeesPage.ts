import { type Locator, type Page, type Response } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeesPage extends BasePage {
  readonly heading: Locator;
  readonly addEmployeeButton: Locator;
  readonly searchInput: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('employees-heading');
    this.addEmployeeButton = page.getByTestId('add-employee-button');
    this.searchInput = page.getByTestId('employees-search');
    this.emptyState = page.getByTestId('employees-empty');
  }

  // Wait for the employees list request, so later actions don't race with it
  // (app race condition: https://github.com/AndriyGvozd/employee-management-crm/issues/4)
  waitForUsersResponse(predicate: (url: string) => boolean = () => true): Promise<Response> {
    return this.page.waitForResponse(
      (res) => res.url().includes('/users') && res.request().method() === 'GET' && predicate(res.url())
    );
  }

  async open(): Promise<void> {
    await this.goto('/employees');
    // React StrictMode (dev) fires the initial list request twice; wait for both
    await this.page.waitForLoadState('networkidle');
  }

  async search(text: string): Promise<void> {
    await Promise.all([
      this.waitForUsersResponse((url) => url.includes('firstName=')),
      this.searchInput.fill(text),
    ]);
  }
}
