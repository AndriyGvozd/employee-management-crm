import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface NewUser {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string; // YYYY-MM-DD
  programmingLanguage: string;
}

export class RegisterPage extends BasePage {
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly middleName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly phone: Locator;
  readonly birthDate: Locator;
  readonly programmingLanguage: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('register-title');
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.middleName = page.locator('#middleName');
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.phone = page.locator('#phone');
    this.birthDate = page.locator('#birthDate');
    this.programmingLanguage = page.locator('#programmingLanguage');
    this.submitButton = page.getByTestId('register-submit');
  }

  async open(): Promise<void> {
    await this.goto('/register');
  }

  async register(user: NewUser): Promise<void> {
    await this.open();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.middleName.fill(user.middleName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.phone.fill(user.phone);
    await this.birthDate.fill(user.birthDate);
    await this.programmingLanguage.fill(user.programmingLanguage);
    await this.submitButton.click();
  }
}
