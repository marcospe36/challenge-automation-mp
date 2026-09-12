import { BasePage } from './BasePage';

export class BookingPage extends BasePage {

    readonly pageTitle = this.page.getByRole('heading',{ name: 'Booking', exact: true });
    private readonly titleSelect = this.page.getByRole('combobox');
    private readonly firstNameInput = this.page.getByPlaceholder('Enter First Name');
    private readonly lastNameInput = this.page.getByPlaceholder('Enter Last Name');
    private readonly emailInput = this.page.getByRole('textbox',{ name: 'Enter Email' });
    private readonly phoneInput = this.page.getByRole('textbox',{ name: 'Enter Phone Number' });
    private readonly termsCheckbox = this.page.locator('#terms_accepted').locator('..').locator('.checkbox-custom');
    private readonly confirmBookingButton = this.page.getByRole('button',{ name: 'lock Confirm Booking' });

    async completarDatos(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {

        await this.titleSelect.first().selectOption({label: 'Mr'});
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
    }

    async aceptarTerminos(): Promise<void> {
        await this.termsCheckbox.click();
    }

    async confirmarBooking(): Promise<void> {
        await this.confirmBookingButton.click();
    }

    async esperarFormularioListo(): Promise<void> {
        await this.page.waitForFunction(() => {
            const select = document.querySelector('select');

            return select &&
                !select.hasAttribute('disabled') &&
                select.offsetParent !== null;
        });
    }
    
}