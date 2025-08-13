import { Page, Locator } from '@playwright/test';

export class RecurringSchedulesPage {
  constructor(page) {
    this.page = page;
    this.recurringHeading = page.getByRole('heading', { name: 'Recurring Schedules', exact: true });
    this.newCustomerButton = page.getByRole('button', { name: 'New' });
    this.modal = page.locator('.modal__content__wrapper');
    this.maximazeButton = page.locator('button[data-tooltip="Maximize View"]');
    this.firstNameTexbox = page.locator('#null-billFirstName');

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
