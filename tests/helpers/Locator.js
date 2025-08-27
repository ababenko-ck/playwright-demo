class Locator {
    constructor(page) {
        this.page = page;
    }

    getByRoleName = (role, name, scope = this.page, options = {}) => {
        return scope.getByRole(role, { name, ...options });
    };

    getByText = (text, options = {}) => {
        return this.page.getByText(text, options);
    };
}

export default Locator;