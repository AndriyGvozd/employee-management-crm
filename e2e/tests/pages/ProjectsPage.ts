import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface NewProject {
  name: string;
  description: string;
  wage?: number;
}

export class ProjectsPage extends BasePage {
  readonly heading: Locator;
  readonly createProjectButton: Locator;
  readonly dialog: Locator;
  readonly dialogTitle: Locator;
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly wageInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('projects-heading');
    this.createProjectButton = page.getByTestId('create-project-button');
    this.dialog = page.getByTestId('create-project-dialog');
    this.dialogTitle = this.dialog.getByTestId('create-project-dialog-title');
    this.nameInput = this.dialog.locator('#name');
    this.descriptionInput = this.dialog.locator('#description');
    this.wageInput = this.dialog.locator('#wage');
    this.submitButton = this.dialog.getByTestId('create-project-submit');
    this.cancelButton = this.dialog.getByTestId('create-project-cancel');
  }

  // Project title found by test id; the name only filters among cards (test data, not UI copy)
  projectCard(name: string): Locator {
    return this.page.getByTestId('project-name').filter({ hasText: name });
  }

  async open(): Promise<void> {
    await this.goto('/projects');
  }

  async createProject({ name, description, wage }: NewProject): Promise<void> {
    await this.createProjectButton.click();
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    if (wage !== undefined) await this.wageInput.fill(String(wage));
    await this.submitButton.click();
  }
}
