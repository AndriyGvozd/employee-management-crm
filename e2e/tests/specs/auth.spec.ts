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

  test('login with wrong password stays on login page without token', async ({ page, loginPage }) => {
    await loginPage.login(ADMIN.email, 'wrong-password');
    await expect(page).toHaveURL(/\/login/);
    expect(await loginPage.authToken()).toBeNull();
  });

  test('login with wrong password shows error toast', async ({ loginPage }) => {
    // Known app bug (https://github.com/AndriyGvozd/employee-management-crm/issues/5): <Toaster /> is rendered only in Layout (pages after login),
    // so /login and /register never show error toasts.
    // Remove test.fail() when the bug is fixed - the test will then pass normally.
    test.fail(true, 'Known bug: error toasts are not shown on /login (Toaster is only in Layout.jsx)');
    await loginPage.login(ADMIN.email, 'wrong-password');
    await expect(loginPage.toast).toHaveAttribute('data-variant', 'destructive', { timeout: 3000 });
    await expect(loginPage.toastTitle).toHaveText('Error');
  });

  test('admin can log in', async ({ page, loginPage, employeesPage }) => {
    await loginPage.login(ADMIN.email, ADMIN.password);
    await expect(loginPage.toastTitle).toHaveText('Success');
    await expect(loginPage.toastDescription).toHaveText('Logged in successfully!');
    // "/" redirects to the employees list
    await expect(page).toHaveURL(/\/employees$/);
    await expect(employeesPage.heading).toBeVisible();
    expect(await loginPage.authToken()).toBeTruthy();
  });

  test('admin can log out', async ({ page, asAdmin, employeesPage }) => {
    await employeesPage.logout();
    await expect(page).toHaveURL(/\/login/);
    expect(await employeesPage.authToken()).toBeNull();
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
    await expect(registerPage.toastTitle).toHaveText('Success');
    await expect(registerPage.toastDescription).toHaveText('Account created successfully!');
    await expect(page).not.toHaveURL(/\/register/);

    await loginPage.login(user.email, user.password);
    await expect(page).not.toHaveURL(/\/login/);
    // employee role must not see admin-only section
    await expect(employeesPage.navLink('notifications')).toHaveCount(0);
  });
});
