import { BasePage } from './BasePage';

export class StripePaymentPage extends BasePage {

    private readonly cardNumberInput = this.page.getByRole('textbox',{ name: 'Card number' });
    private readonly expirationInput = this.page.getByRole('textbox',{ name: 'Expiration' });
    private readonly cvcInput = this.page.getByRole('textbox',{ name: 'Credit or debit card CVC/CVV' });
    private readonly cardholderNameInput = this.page.getByRole('textbox',{ name: 'Cardholder name' });
    private readonly countrySelect = this.page.getByLabel('Country or region');
    private readonly payButton = this.page.getByTestId('hosted-payment-submit-button');
    readonly successMessage = this.page.getByText('Success',{ exact: true });
    readonly paymentSuccessfulMessage = this.page.getByText('Payment successful! Your car');

    async completarDatosTarjeta(
        cardNumber: string,
        expiration: string,
        cvc: string,
        cardholderName: string,
        country: string
    ): Promise<void> {

        await this.cardNumberInput.fill(cardNumber);
        await this.expirationInput.fill(expiration);
        await this.cvcInput.fill(cvc);
        await this.cardholderNameInput.fill(cardholderName);
        await this.countrySelect.selectOption({label: country});
    
    }

    async pagar(): Promise<void> {
        await this.payButton.click();
    }
}