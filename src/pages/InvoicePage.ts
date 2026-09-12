import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InvoicePage extends BasePage {

    readonly invoiceTitle = this.page.getByRole('heading', { name: 'Invoice Details' } );
    private readonly makePaymentButton = this.page.getByRole( 'button',{ name: 'payment Make Payment' });

    async hacerPago(): Promise<void> {
        await this.makePaymentButton.waitFor({state:'visible'});
        await expect(this.makePaymentButton).toBeEnabled();
        await this.makePaymentButton.click();
    }
}