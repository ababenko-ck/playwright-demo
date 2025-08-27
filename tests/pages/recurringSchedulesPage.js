import { expect } from '@playwright/test';
import Locator from '../helpers/Locator';

export class RecurringSchedulesPage {
  constructor(page) {
    this.page = page;
    this.locator = new Locator(this.page);
    this.recurringHeading = this.locator.getByRoleName('heading', 'Recurring Schedules');
    this.newCustomerButton = this.locator.getByRoleName('button', 'New');
    this.modal = page.locator('.modal__content__wrapper');
    this.maximazeButton = page.locator('button[data-tooltip="Maximize View"]');
    this.firstNameTexbox = page.locator('#null-billFirstName');
    this.templatesTab = page.locator('a.tabs__link:has-text("Templates")');
    this.deleteTemplateButton = page.locator('button[data-tooltip="Delete template"]').first();
    this.firstExistingRecurringSchedule = page.locator('tbody .grid-style-odd .type--ellipsis').first();
    this.sidebar = page.locator('.grid-sidebar');
    this.addScheduleButtonSidebar = this.locator.getByRoleName('button', 'Add Schedule', this.sidebar);
    this.scheduleNameFieldSidebar = this.sidebar.locator('input[placeholder="Schedule Name"]').first();
    this.amountTextFieldSidebar = this.sidebar.locator('input[name="amount"]').first();
    this.saveButtonSidebar = this.locator.getByRoleName('button', 'Save', this.sidebar);
    this.numberOfPaymentsCheckbox = this.sidebar.getByText('Number of Payments').first();
    this.totalPaymentsField = this.sidebar.locator('input[name="totalPayments"]').first();
    this.scheduleNameInput = page.locator('#xScheduleName');
    this.amountInput = page.locator('#amount');
    this.xButton = this.modal.locator('.modal__close--header');
    this.deleteButtonTemplate = this.locator.getByRoleName('button', 'Delete', this.modal);
    this.paymentMethod = page.locator('a.tabs--vertical__link:has-text("Payment Method")');
    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.transactionExpDate = page.locator('input[name="exp"]');
    this.recurringSchedule = page.locator('a.tabs--vertical__link:has-text("Recurring Schedule")');
    this.scheduleNameField = page.getByPlaceholder('Schedule Name');
    this.amountTextFieldByRole = this.locator.getByRoleName('textbox', 'Amount');
    this.neverCheckboxLabel = this.sidebar.getByText('Never').first();
    this.saveButton = this.locator.getByRoleName('button', 'Save');
    this.viewCustomerLink = this.locator.getByRoleName('link', 'View customer');
    this.customerCreatedModal = page.locator('.modal__content__wrapper');
    this.customerScheduleDropdown = page.locator('.css-1hwfws3').first();
    this.sidebarTabs = page.locator('.segmented-control');
    this.generalLink = this.locator.getByRoleName('link', 'General');
    this.paymentsLink = this.locator.getByRoleName('link', 'Payments');
    this.scheduleLink = this.locator.getByRoleName('link', 'Schedule');
    this.historyLink = this.locator.getByRoleName('link', 'History');
    this.neverCheckboxLabelModal = this.modal.getByText('Never').first();
    this.saveButtonTemplate = this.locator.getByRoleName('button', 'Save', this.modal);
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


