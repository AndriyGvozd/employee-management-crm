import { test, expect, ADMIN } from '../../fixtures';
import type { NewUser } from '../pages/RegisterPage';

test.describe('Auth @smoke', () => {
  test('login page is displayed', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('unauthenticated user is redirected to login', async ({ page, employeesPage }) => {
    await employeesPage.goto('/employees');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login with wrong password stays on login page', async ({ page, loginPage }) => {
    await loginPage.login(ADMIN.email, 'wrong-password');
    await expect(page).toHaveURL(/\/login/);
  });

  test('admin can log in', async ({ page, loginPage }) => {
    await loginPage.login(ADMIN.email, ADMIN.password);
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('admin can log out', async ({ page, asAdmin, employeesPage }) => {
    await employeesPage.logout();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Registration', () => {
  test('register page opens from login page link', async ({ page, loginPage, registerPage }) => {
    await loginPage.open();
    await loginPage.createAccountLink.click();
    await expect(page).toHaveURL(/\/register/);
    await expect(registerPage.title).toBeVisible();
  });

  test('new employee can register and then log in', async ({ page, registerPage, loginPage, employeesPage }) => {
    const user: NewUser = {
      firstName: 'Ui',
      lastName: 'Tester',
      middleName: 'Smoke',
      email: `ui.tester.${Date.now()}@example.com`,
      password: 'password123',
      phone: '+380501234567',
      birthDate: '1995-05-05',
      programmingLanguage: 'JavaScript',
    };
    await registerPage.register(user);
    await expect(page).not.toHaveURL(/\/register/);

    await loginPage.login(user.email, user.password);
    await expect(page).not.toHaveURL(/\/login/);
    // employee role must not see admin-only section
    await expect(employeesPage.navLink('notifications')).toHaveCount(0);
  });
});
