import { test, expect } from '../../fixtures';

test.describe('Navigation @smoke', () => {
  test('admin opens Employees from navigation', async ({ asAdmin, employeesPage }) => {
    await employeesPage.openSection('employees');
    await expect(employeesPage.heading).toBeVisible();
  });

  test('admin opens Projects from navigation', async ({ asAdmin, projectsPage }) => {
    await projectsPage.openSection('projects');
    await expect(projectsPage.heading).toBeVisible();
  });

  test('admin opens Notifications from navigation', async ({ asAdmin, notificationsPage }) => {
    await notificationsPage.openSection('notifications');
    await expect(notificationsPage.heading).toBeVisible();
  });

  test('unknown route shows 404 page', async ({ asAdmin, notFoundPage }) => {
    await notFoundPage.goto('/this-page-does-not-exist');
    await expect(notFoundPage.code).toBeVisible();
    await expect(notFoundPage.message).toBeVisible();
  });
});
