import { Page, Locator } from '@playwright/test';

export class ReportsPage {
  constructor(page) {
    this.page = page;
    this.reportsHeading = page.getByRole('heading', { name: 'Reports', exact: true });
    this.viewReportButton = page.getByRole('button', { name: 'View Report' });
    this.transactionsHeading = page.getByRole('heading');
    this.reportTypeDropdown = page.locator('div:nth-child(3) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3');
    this.allTextOption = page.getByText('All', { exact: true });
  }

  async navigateToReports() {
    // Assuming navigation to reports happens via a link on the current page,
    // or a direct URL. For now, I'll assume it's a direct navigation or
    // a click on a reports link from a previous page (e.g., loginPage).
    // If there's a specific URL for reports, it can be added here.
    // For now, I'll just include the actions related to the reports page itself.
  }

}
