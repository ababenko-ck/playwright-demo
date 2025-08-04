class GiftReportPage {
    constructor(page) {
        this.page = page;
        this.giftReportLink = page.getByRole('link', { name: 'Gift Report' });
        this.giftReportHeading = page.getByRole('heading', { name: 'Gift Report' });
        this.categorySearchInput = page.locator('//input[@placeholder="Search by category"]'); // Placeholder locator
        this.categoryDropdown = page.locator('//select[@id="category-select"]'); // Placeholder locator
        this.searchButton = page.locator('//button[text()="Search"]'); // Placeholder locator
        this.selectedDateRangeText = page.locator('.rc-menu-input-text');
        this.last90DaysListItem = page.getByRole('menuitem', { name: 'Last 90 Days' });
        this.allButton = page.getByRole('button', { name: 'All' });
        this.addFilterButton = page.getByText('Add Filter');
        this.addFilterListItem = page.getByRole('listitem').filter({ hasText: 'Add Filter' }).locator('div');
        this.giftCardNumberOption = page.getByText('Gift card number', { exact: true });
        this.giftCardNumberTextbox = page.getByRole('textbox', { name: 'Gift Card number' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.zeroResultsText = page.getByText('0 Results');
        this.changeFilterText = page.getByText('You should change your filter');
        this.emptyStateTitle = page.locator('.table--primary__emptystate__title');
        this.table = page.locator('.table--primary');
        this.activityButton = page.getByRole('link', { name: 'Activity' });
        this.summaryButton = page.getByRole('link', { name: 'Summary' });
        this.liabilityButton = page.getByRole('link', { name: 'Liability' });
        this.exportButton = page.getByRole('button', { name: 'Export' }); 
        this.printButton = page.getByRole('button', { name: 'Print' });
        this.giftBalanceButton = page.getByRole('button', { name: 'Gift Balance' });

        // Columns in the activity grid
        this.referenceNumberColumn = page.locator('[name="header-filter-xRefNum"]')
        this.giftCardNumberColumn = page.locator('[name="header-filter-xMaskedCardNumber"]')
        this.amountColumn = page.getByText('Amount').first();
        this.cardholderNameColumn = page.locator('[name="header-filter-xName"]')
        this.dateAndTimeColumn = page.locator('[name="header-filter-xEnteredDate"]')
        this.locationColumn = page.locator('[name="header-filter-xLocation"]')
        this.commandColumn = page.locator('[name="filter-xCommand"]')
        this.invoiceColumn = page.locator('[name="header-filter-xInvoice"]')
        this.custom01Column = page.getByText('Custom01');  
        
        // Columns in the summary grid
        this.locationColumn = page.locator('[name="header-filter-xLocation"]')
        this.transactionCountColumn = page.getByText('Transaction Count');  
        this.totalAmountColumn = page.getByText('Total Amount');
        this.parentLocationColumn = page.getByText('Parent Location');

        // Columns in the liability grid
        this.giftCardNumberColumn = page.locator('[name="header-filter-xMaskedCardNumber"]')
        this.remainingBalanceColumn = page.getByText('Remaining Balance');  
        this.firstNameColumn = page.getByText('First Name');  
        this.lastNameColumn = page.getByText('Last Name');  
        this.emailColumn = page.getByText('Email');  

        // Date filter elements
        this.datePickerPopup = page.locator('.rc-menu-datepicker-tooltip');
        this.yesterdayOption = this.datePickerPopup .getByRole('menuitem', { name: 'Yesterday' });
        this.customOption = this.datePickerPopup.locator('.rc-menu-submenu-vertical')
        this.startDateInput = page.getByPlaceholder('Start Date');  
        this.endDateInput = page.getByPlaceholder('End Date');
        this.datepicker = page.locator('.datepicker');
        this.applyButton = this.datepicker.getByRole('button', { name: 'Apply' });
    }

}

module.exports = GiftReportPage;
