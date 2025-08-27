import Locator from '../helpers/Locator';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page)
    this.reportsLink = this.locator.getByRoleName('link', 'Reports');
    this.dashboardLink = this.locator.getByRoleName('link', 'Dashboard');
    this.recurringSchedulesLink = this.locator.getByRoleName('link', 'Recurring Schedules');
    this.welcomeHeading = this.locator.getByRoleName('heading', 'Welcome to Sola' );
    this.dateRangeMenu = this.locator.getByRoleName('menu').locator('div');
    this.customDateRangeButton = this.locator.getByText('Custom', { exact: true });
    this.startDateInput = page.getByPlaceholder('MM/DD/YYYY').first();
    this.endDateInput = page.getByPlaceholder('MM/DD/YYYY').last();
    this.applyButton = this.locator.getByRoleName('button', 'Apply');
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
