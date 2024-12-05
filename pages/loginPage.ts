import { Page } from '@playwright/test';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private usernameEditBox = "#username";
  private passwordEditBox = "#password";
  private signInButton = "//button[text()='Sign in']";
  
  async login(username: string, password: string) {
    await this.page.fill(this.usernameEditBox, username);
    await this.page.fill(this.passwordEditBox, password);
    await this.page.click(this.signInButton);
  }

  

}
