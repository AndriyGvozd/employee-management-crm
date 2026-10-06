import { test, expect } from '../../fixtures';

test.describe('My Profile', () => {
  test.beforeEach(async ({ asAdmin, profilePage }) => {
    await profilePage.openSection('profile');
    await expect(profilePage.heading).toBeVisible();
  });

  test('admin profile shows Administrator role', async ({ profilePage }) => {
    await expect(profilePage.role).toHaveText('Administrator');
  });

  test('Edit Profile opens edit form', async ({ profilePage }) => {
    await profilePage.editButton.click();
    await expect(profilePage.firstNameInput).toBeVisible();
    await expect(profilePage.editButton).toBeHidden();
  });
});
