import { BasePage } from './BasePage';

export class CarDetailsPage extends BasePage {

    private readonly bookNowButton = this.page.getByRole('button', { name: 'shopping_cart Book Now' });

    async reservar(): Promise<void> {
        await this.bookNowButton.click();
    }
}