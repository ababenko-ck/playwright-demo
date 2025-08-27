import Locator from '../helpers/Locator';

class GiftReportPage {
    constructor(page) {
        this.page = page;
        this.locator = new Locator(this.page)
        this.giftReportLink = this.locator.getByRoleName('link', 'Gift Report');
        this.giftReportHeading = this.locator.getByRoleName('heading', 'Gift Report');
        this.categorySearchInput = page.locator('//input[@placeholder="Search by category"]'); 
        this.categoryDropdown = page.locator('//select[@id="category-select"]'); 
        this.searchButton = page.locator('//button[text()="Search"]'); 
        this.selectedDateRangeText = page.locator('.rc-menu-input-text');
        this.last90DaysListItem = this.locator.getByRoleName('menuitem', 'Last 90 Days');
        this.allButton = this.locator.getByRoleName('button', 'All');
        this.addFilterButton = this.locator.getByText('Add Filter');
        this.addFilterListItem = this.locator.getByRoleName('listitem').filter({ hasText: 'Add Filter' }).locator('div');
        this.giftCardNumberOption = this.locator.getByText('Gift card number', { exact: true });
        this.giftCardNumberTextbox = this.locator.getByRoleName('textbox', 'Gift Card number');
        this.submitButton = this.locator.getByRoleName('button', 'Submit');
        this.zeroResultsText = this.locator.getByText('0 Results');
        this.changeFilterText = this.locator.getByText('You should change your filter');
        this.emptyStateTitle = page.locator('.table--primary__emptystate__title');
        this.table = page.locator('.table--primary');
        this.activityButton = this.locator.getByRoleName('link', 'Activity');
        this.summaryButton = this.locator.getByRoleName('link', 'Summary');
        this.liabilityButton = this.locator.getByRoleName('link', 'Liability');
        this.exportButton = this.locator.getByRoleName('button', 'Export'); 
        this.printButton = this.locator.getByRoleName('button', 'Print');
        this.giftBalanceButton = this.locator.getByRoleName('button', 'Gift Balance');
        this.referenceNumberColumn = page.locator('[name="header-filter-xRefNum"]')
        this.giftCardNumberColumn = page.locator('[name="header-filter-xMaskedCardNumber"]')
        this.amountColumn = this.locator.getByText('Amount').first();
        this.cardholderNameColumn = page.locator('[name="header-filter-xName"]')
        this.dateAndTimeColumn = page.locator('[name="header-filter-xEnteredDate"]')
        this.locationColumn = page.locator('[name="header-filter-xLocation"]')
        this.commandColumn = page.locator('[name="filter-xCommand"]')
        this.invoiceColumn = page.locator('[name="header-filter-xInvoice"]')
        this.custom01Column = this.locator.getByText('Custom01');  
        this.locationColumn = page.locator('[name="header-filter-xLocation"]')
        this.transactionCountColumn = this.locator.getByText('Transaction Count');  
        this.totalAmountColumn = this.locator.getByText('Total Amount');
        this.parentLocationColumn = this.locator.getByText('Parent Location');
        this.giftCardNumberColumn = page.locator('[name="header-filter-xMaskedCardNumber"]')
        this.remainingBalanceColumn = this.locator.getByText('Remaining Balance');  
        this.firstNameColumn = this.locator.getByText('First Name');  
        this.lastNameColumn = this.locator.getByText('Last Name');  
        this.emailColumn = this.locator.getByText('Email');  
        this.datePickerPopup = page.locator('.rc-menu-datepicker-tooltip');
        this.yesterdayOption = this.locator.getByRoleName('menuitem', 'Yesterday', this.datePickerPopup);
        this.customOption = this.datePickerPopup.locator('.rc-menu-submenu-vertical')
        this.startDateInput = page.getByPlaceholder('Start Date');  
        this.endDateInput = page.getByPlaceholder('End Date');
        this.datepicker = page.locator('.datepicker');
        this.applyButton = this.locator.getByRoleName('button', 'Apply', this.datepicker);
    }
}

module.exports = GiftReportPage;
