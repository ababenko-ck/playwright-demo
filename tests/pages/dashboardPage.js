import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.reportsLink = page.getByRole('link', { name: 'Reports' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.recurringSchedulesLink = page.getByRole('link', { name: 'Recurring Schedules' });
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to Sola' });
    this.dateRangeMenu = page.getByRole('menu').locator('div');
    this.customDateRangeButton = page.getByText('Custom', { exact: true });
    this.startDateInput = page.getByPlaceholder('MM/DD/YYYY').first();
    this.endDateInput = page.getByPlaceholder('MM/DD/YYYY').last();
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.daterangeText = page.locator('.rc-menu-input-text');
  }

  datePickerDay(day) {
    return this.page.getByRole('button', { name: day, exact: true });
  }

  async navigateToReports() {
    await this.reportsLink.click();
  }

  async navigateToRecurringSchedules() {
    await this.recurringSchedulesLink.click();
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
  }
}
