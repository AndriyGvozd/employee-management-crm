import { test, expect } from '../../fixtures';

test.describe('Employees', () => {
  test.beforeEach(async ({ asAdmin, employeesPage }) => {
    await employeesPage.open();
    await expect(employeesPage.heading).toBeVisible();
  });

  test('admin sees Add Employee button', async ({ employeesPage }) => {
    await expect(employeesPage.addEmployeeButton).toBeVisible();
  });

  test('Add Employee opens create form', async ({ page, employeesPage, createEmployeePage }) => {
    await employeesPage.addEmployeeButton.click();
    await expect(page).toHaveURL(/\/employees\/new/);
    await expect(createEmployeePage.title).toBeVisible();
    await expect(createEmployeePage.firstName).toBeVisible();
  });

  test('search with unknown name shows empty state', async ({ employeesPage }) => {
    await employeesPage.search(`nobody-${Date.now()}`);
    await expect(employeesPage.emptyState).toBeVisible();
  });
});
