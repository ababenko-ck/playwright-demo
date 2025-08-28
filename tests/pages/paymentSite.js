import { expect } from '@playwright/test';
import Locator from '../helpers/Locator';
import path from 'path';
import fs from 'fs';

export class PaymentSitePage {
    constructor(page) {
        this.page = page;
        this.locator = new Locator(this.page);

        this.settingsLink = this.locator.getByRoleName('link', 'Settings');
        this.gatewaySettingsLink = this.locator.getByRoleName('link', 'Gateway Settings');
        this.exportButton = this.locator.getByRoleName('button', 'Export');
        this.copyPaymentSiteUrlButton = this.locator.getByRoleName('button', 'Copy PaymentSITE URL');
        this.editButton = this.locator.getByRoleName('button', 'Edit');
        this.manageLayoutButton = this.locator.getByRoleName('button', 'Manage Layout');
        this.generalSettingsButton = this.locator.getByRoleName('button', 'General Settings');
        this.addNewSectionButton = this.locator.getByRoleName('button', 'Add a New Section');
        this.newSectionButton = this.locator.getByRoleName('button', 'New Section');
        this.deleteSectionButton = this.locator.getByRoleName('button', 'Delete Section');
        this.removeButton = this.locator.getByRoleName('button', 'Remove');
        this.expandAllButton = this.locator.getByRoleName('button', 'Expand All');
        this.undoButton = this.locator.getByRoleName('button', 'Undo');
        this.publishButton = this.locator.getByRoleName('button', 'Publish');
        this.confirmButton = this.locator.getByRoleName('button', 'Confirm');
        this.secondaryActionButton = page.locator('.btn.btn--action.btn--action--secondary');
        this.themesButton = this.locator.getByRoleName('button', 'Themes');
        this.paymentMethodsButton = this.locator.getByRoleName('button', 'Payment Methods');
        this.paymentMethodsCollapseButton = this.locator.getByRoleName('button', 'Payment Methods Collapse');
        this.transactionTypesButton = this.locator.getByRoleName('button', 'Transaction Types');
        this.transactionTypesCollapseButton = this.locator.getByRoleName('button', 'Transaction Types Collapse');
        this.termsAndConditionsButton = this.locator.getByRoleName('button', 'Terms And Conditions');
        this.electronicTransferFeeButton = this.locator.getByRoleName('button', 'Electronic Transfer Fee');
        this.receiptOptionsButton = this.locator.getByRoleName('button', 'Receipt Options');
        this.redirectOptionsButton = this.locator.getByRoleName('button', 'Redirect Options');
        this.enableDigitalWalletButton = this.locator.getByRoleName('button', 'Enable Digital Wallet');
        this.accountTabsText = page.locator('div').filter({ hasText: /^Account Tabs$/ }).first();
        this.addTabButton = this.locator.getByRoleName('button', 'Add Tab');
        this.accountTabLabel = page.locator('div > .flex--primary > .spc--right--tny > label');
        this.sidebarToggleButton = page.locator('button.btn--sidebar-toggle');
        this.editTooltip = this.locator.getByRoleName('tooltip', 'Edit');
        this.managementHeading = page.locator('h5', { hasText: 'PaymentSITE Management' });


    }

    async goToPaymentSiteManagement() {
        await this.settingsLink.click();
        await this.gatewaySettingsLink.click();
        await expect(this.managementHeading).toBeVisible();
        await expect(this.exportButton).toBeVisible();
    }

    async goToPaymentSiteManageLayout() {
        await this.goToPaymentSiteManagement();
        const firstDataRow = this.page.locator('tbody tr').first();
        await expect(firstDataRow).toBeVisible({ timeout: 15000 });
        const editButtonInRow = firstDataRow.locator('button[data-tooltip="Edit"]');
        await expect(editButtonInRow).toBeVisible({ timeout: 15000 });
        await editButtonInRow.click();
        await expect(this.manageLayoutButton).toBeVisible({ timeout: 15000 });
        await expect(this.publishButton).toBeVisible();
    }

    async goToPaymentSiteGeneralSettings() {
       await this.goToPaymentSiteManageLayout();
       await expect(this.generalSettingsButton).toBeVisible({ timeout: 15000 });
       await this.generalSettingsButton.click();
       await expect(this.publishButton).toBeVisible();
    }

    async exportPaymentSiteFile(downloadsFolder = '../../temp_downloads') {
        const [download] = await Promise.all([
            this.page.waitForEvent('download', { timeout: 30000 }),
            this.exportButton.click()
        ]);
        const suggestedFileName = download.suggestedFilename();
        if (!/\.(csv|xlsx|pdf)$/i.test(suggestedFileName)) {
            throw new Error(`Unexpected file type: ${suggestedFileName}`);
        }
        const downloadsPath = path.resolve(__dirname, downloadsFolder);
        if (!fs.existsSync(downloadsPath)) {
            fs.mkdirSync(downloadsPath, { recursive: true });
        }
        const filePath = path.join(downloadsPath, suggestedFileName);
        await download.saveAs(filePath);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Downloaded file not found: ${filePath}`);
        }
        return filePath;
    }


}

