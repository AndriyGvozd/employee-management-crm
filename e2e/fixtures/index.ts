// Custom fixtures: every test gets ready-to-use page objects.
import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../tests/pages/LoginPage';
import { RegisterPage } from '../tests/pages/RegisterPage';
import { EmployeesPage } from '../tests/pages/EmployeesPage';
import { CreateEmployeePage } from '../tests/pages/CreateEmployeePage';
import { ProjectsPage } from '../tests/pages/ProjectsPage';
import { ProfilePage } from '../tests/pages/ProfilePage';
import { NotificationsPage } from '../tests/pages/NotificationsPage';
import { NotFoundPage } from '../tests/pages/NotFoundPage';

// Default admin is created by app.js on first startup
export const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'adminpassword',
};

type Pages = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  employeesPage: EmployeesPage;
  createEmployeePage: CreateEmployeePage;
  projectsPage: ProjectsPage;
  profilePage: ProfilePage;
  notificationsPage: NotificationsPage;
  notFoundPage: NotFoundPage;
  // Page already logged in as admin
  asAdmin: Page;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  employeesPage: async ({ page }, use) => use(new EmployeesPage(page)),
  createEmployeePage: async ({ page }, use) => use(new CreateEmployeePage(page)),
  projectsPage: async ({ page }, use) => use(new ProjectsPage(page)),
  profilePage: async ({ page }, use) => use(new ProfilePage(page)),
  notificationsPage: async ({ page }, use) => use(new NotificationsPage(page)),
  notFoundPage: async ({ page }, use) => use(new NotFoundPage(page)),

  asAdmin: async ({ page, loginPage }, use) => {
    await loginPage.login(ADMIN.email, ADMIN.password);
    await expect(page).not.toHaveURL(/\/login/);
    await use(page);
  },
});

export { expect };
