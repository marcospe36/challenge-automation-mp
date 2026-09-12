import { BasePage } from './BasePage';

export class CarRentalPage extends BasePage {

    private readonly pickupLocationButton = this.page.getByText('Pick-up Location City or Airport expand_more');
    private readonly pickupLocationInput = this.page.getByRole('textbox',{ name: 'City or Airport' });
    private readonly pickupOptions = this.page.locator('#car_pick_p').locator('div.cursor-pointer');
    private readonly returnLocationButton = this.page.getByText('Return Location Same As Pick-up expand_more');
    private readonly returnLocationInput = this.page.locator('#car_drop_q');
    private readonly returnOptions = this.page.locator('#car_drop_p').locator('div.cursor-pointer');
    private readonly searchCarsButton = this.page.getByRole('button',{ name: 'Search Cars' });
    private readonly bookNowButtons = this.page.getByText('Book Nowarrow_forward');

    async seleccionarOrigen(ciudad: string): Promise<void> {
        await this.pickupLocationButton.click();
        await this.pickupLocationInput.fill(ciudad);
        await this.pickupOptions.first().click();
    }

    async seleccionarDestino(ciudad: string): Promise<void> {
        await this.returnLocationButton.click();
        await this.returnLocationInput.fill(ciudad);
        await this.returnOptions.first().click();
    }

    async buscarAutos(): Promise<void> {
        await this.searchCarsButton.click();
    }

    async seleccionarPrimerAuto(): Promise<void> {
        await this.bookNowButtons.first().click();
    }
}