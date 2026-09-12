import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private readonly carsMenu = this.page.getByText('Cars', { exact: true });
    private readonly flightsMenu = this.page.getByText('Flights', { exact: true });

    async aceptarAvisoInicial(): Promise<void> {
        const boton = this.page.getByRole('button', { name: 'I Understand & Continue'});
        await boton.click();
    }

    async irAAboutUs(): Promise<void> {
        await this.page.getByRole('button', { name: 'Company' }).click();
        await this.page.getByRole('link', { name: 'About us' }).click();
    }
}