import { Page, Locator } from '@playwright/test';

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
    this.numberOfPaymentsCheckbox =  this.sidebar.getByText('Number of Payments').first();
    this.totalPaymentsField =  this.sidebar.locator('input[name="totalPayments"]').first();

    // New Schedule Template form elements
    this.scheduleNameInput = page.locator('#xScheduleName');
    this.amountInput = page.locator('#amount');
    this.saveButtonTemplate = this.modal.getByRole('button', { name: 'Save' });
    this.xButton = this.modal.locator('.modal__close--header');
    this.deleteButtonTemplate = this.modal.getByRole('button', { name: 'Delete' });

    //Add new customer form elements
    this.paymentMethod = page.locator('a.tabs--vertical__link:has-text("Payment Method")');
    this.cardNumberInput = page.frameLocator('iframe[data-ifields-id="card-number"]').locator('#data');
    this.transactionExpDate = page.locator('input[name="exp"]');
    this.recurringSchedule= page.locator('a.tabs--vertical__link:has-text("Recurring Schedule")');
    this.scheduleNameField = page.getByPlaceholder('Schedule Name');
    this.amountTextFieldByRole = page.getByRole('textbox', { name: 'Amount' });
    this.neverCheckboxLabel = page.getByText('Never');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.viewCustomerLink = page.getByRole('link', { name: 'View customer' });

    // New customer form elements
    this.sidebar = page.locator('.grid-sidebar');
    this.sidebarTabs = page.locator('.segmented-control');
    this.generalLink = page.getByRole('link', { name: 'General' });
    this.paymentsLink = page.getByRole('link', { name: 'Payments' });
    this.scheduleLink = page.getByRole('link', { name: 'Schedule' });
    this.historyLink = page.getByRole('link', { name: 'History' });
  }

   async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');  
  }

}
