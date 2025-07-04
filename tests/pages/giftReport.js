class GiftReportPage {
    constructor(page) {
        this.page = page;
        this.giftReportLink = page.getByRole('link', { name: 'Gift Report' });
        this.giftReportHeading = page.getByRole('heading', { name: 'Gift Report' });
        this.categorySearchInput = page.locator('//input[@placeholder="Search by category"]'); // Placeholder locator
        this.categoryDropdown = page.locator('//select[@id="category-select"]'); // Placeholder locator
        this.searchButton = page.locator('//button[text()="Search"]'); // Placeholder locator
        this.last90DaysText = page.locator('.rc-menu-input-text');
        this.last90DaysListItem = page.getByRole('menuitem', { name: 'Last 90 Days' });
        // this.appLast90DaysText = page.locator('#app').getByText('Last 90 Days');
        this.allButton = page.getByRole('button', { name: 'All' });
        this.addFilterButton = page.getByText('Add Filter');
        this.addFilterListItem = page.getByRole('listitem').filter({ hasText: 'Add Filter' }).locator('div');
        this.giftCardNumberOption = page.getByText('Gift card number', { exact: true });
        this.giftCardNumberTextbox = page.getByRole('textbox', { name: 'Gift Card number' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.zeroResultsText = page.getByText('0 Results');
        this.changeFilterText = page.getByText('You should change your filter');
        this.emptyStateTitle = page.locator('.table--primary__emptystate__title');
    }

    async searchByCategory(category) {
        // await this.categorySearchInput.fill(category);
        // await this.searchButton.click();
    }
}

module.exports = GiftReportPage;
