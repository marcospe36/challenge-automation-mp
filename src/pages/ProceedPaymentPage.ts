import { BasePage } from './BasePage';

export class ProceedPaymentPage extends BasePage {

    readonly pageTitle = this.page.getByRole('heading', { name: 'Proceed to Payment' });
    readonly payWithStripe = this.page.getByText('Pay with Stripe');
    private readonly proceedButton = this.page.getByRole( 'button',{ name: 'Proceed to Payment' });

    async continuarAlPago(): Promise<void> {
        await this.proceedButton.click();
    }
    
}