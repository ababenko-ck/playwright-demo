import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.reportsLink = page.getByRole('link', { name: 'Reports' });
  }

  async navigateToReports() {
    await this.reportsLink.click();
  }
}
