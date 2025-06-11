class GiftReportPage {
    constructor(page) {
        this.page = page;
        this.giftReportLink = page.getByRole('link', { name: 'Gift Report' });
        this.giftReportHeading = page.getByRole('heading', { name: 'Gift Report' });
        this.categorySearchInput = page.locator('//input[@placeholder="Search by category"]'); // Placeholder locator
        this.categoryDropdown = page.locator('//select[@id="category-select"]'); // Placeholder locator
        this.searchButton = page.locator('//button[text()="Search"]'); // Placeholder locator
        this.last90DaysText = page.getByText('Last 90 Days');
        this.last90DaysListItem = page.getByRole('listitem').filter({ hasText: 'Last 90 Days' }).locator('div');
        this.appLast90DaysText = page.locator('#app').getByText('Last 90 Days');
        this.allButton = page.getByRole('button', { name: 'All' });
    }

    async searchByCategory(category) {
        // await this.categorySearchInput.fill(category);
        // await this.searchButton.click();
    }
}

module.exports = GiftReportPage;
