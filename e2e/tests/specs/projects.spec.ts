import { test, expect } from '../../fixtures';

test.describe('Projects', () => {
  test.beforeEach(async ({ asAdmin, projectsPage }) => {
    await projectsPage.open();
    await expect(projectsPage.heading).toBeVisible();
  });

  test('create project dialog opens and closes', async ({ projectsPage }) => {
    await projectsPage.createProjectButton.click();
    await expect(projectsPage.dialogTitle).toBeVisible();
    await projectsPage.cancelButton.click();
    await expect(projectsPage.dialog).toBeHidden();
  });

  test('admin creates a new project', async ({ projectsPage }) => {
    const name = `UI Project ${Date.now()}`;
    await projectsPage.createProject({ name, description: 'Created by Playwright', wage: 1500 });
    await expect(projectsPage.projectCard(name)).toBeVisible();
  });
});
