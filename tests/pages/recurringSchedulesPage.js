import { expect } from '@playwright/test';

export class RecurringSchedulesPage {
  constructor(page) {
    this.page = page;
    this.recurringHeading = page.getByRole('heading', { name: 'Recurring Schedules', exact: true });
    this.newCustomerButton = page.getByRole('button', { name: 'New' });
    this.modal = page.locator('.modal__content__wrapper');
    this.maximazeButton = page.locator('button[data-tooltip="Maximize View"]');
    this.firstNameTexbox = page.locator('#null-billFirstName');
    this.templatesTab = page.locator('a.tabs__link:has-text("Templates")');
    this.deleteTemplateButton = page.locator('button[data-tooltip="Delete template"]').first();
    this.firstExistingRecurringSchedule = page.locator('tbody .grid-style-odd .type--ellipsis').first();
    this.sidebar = page.locator('.grid-sidebar');
    this.addScheduleButtonSidebar = this.sidebar.getByRole('button', { name: 'Add Schedule' });
    this.scheduleNameFieldSidebar = this.sidebar.locator('input[placeholder="Schedule Name"]').first();
    this.amountTextFieldSidebar = this.sidebar.locator('input[name="amount"]').first();
    this.saveButtonSidebar = this.sidebar.getByRole('button', { name: 'Save' });
    this.numberOfPaymentsCheckbox = this.sidebar.getByText('Number of Payments').first();
    this.totalPaymentsField = this.sidebar.locator('input[name="totalPayments"]').first();
    this.scheduleNameInput = page.locator('#xScheduleName');
    this.amountInput = page.locator('#amount');
    this.saveButtonTemplate = this.modal.getByRole('button', { name: 'Save' });
    this.xButton = this.modal.locator('.modal__close--header');
    this.deleteButtonTemplate = this.modal.getByRole('button', { name: 'Delete' });
    this.paymentMethod = page.locator('a.tabs--vertical__link:has-text("Payment Method")');
    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.transactionExpDate = page.locator('input[name="exp"]');
    this.recurringSchedule = page.locator('a.tabs--vertical__link:has-text("Recurring Schedule")');
    this.scheduleNameField = page.getByPlaceholder('Schedule Name');
    this.amountTextFieldByRole = page.getByRole('textbox', { name: 'Amount' });
    this.neverCheckboxLabel = this.sidebar.getByText('Never').first();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.viewCustomerLink = page.getByRole('link', { name: 'View customer' });
    this.customerCreatedModal = page.locator('.modal__content__wrapper'); 
    this.customerScheduleDropdown = page.locator('.css-1hwfws3').first();
    this.sidebarTabs = page.locator('.segmented-control');
    this.generalLink = page.getByRole('link', { name: 'General' });
    this.paymentsLink = page.getByRole('link', { name: 'Payments' });
    this.scheduleLink = page.getByRole('link', { name: 'Schedule' });
    this.historyLink = page.getByRole('link', { name: 'History' });
    this.neverCheckboxLabelModal = this.modal.getByText('Never').first();
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
  }

async createSchedule(name, amount) {
  await this.addScheduleButtonSidebar.click();

  await this.scheduleNameFieldSidebar.fill(name);
  await this.amountTextFieldSidebar.fill(amount);

  await this.neverCheckboxLabel.scrollIntoViewIfNeeded();
  await this.neverCheckboxLabel.click();

  await this.saveButtonSidebar.click();

  const newScheduleLocator = this.sidebar.getByText(name, { exact: true });
  await expect(newScheduleLocator).toBeVisible({ timeout: 20000 });

  await expect(this.modal).toBeVisible();
  await expect(this.modal).toContainText('Recurring schedule updated');
  await this.xButton.click();
}
}


