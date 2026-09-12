import { BasePage } from './BasePage';

export class TopMenuPage extends BasePage {

    private readonly companyButton = this.page.getByRole('button', { name: 'Company expand_more' });
    private readonly aboutUsLink = this.page.getByRole('navigation').getByRole('link', {name: 'About us'});

    async irAAboutUs(): Promise<void> {
        await this.companyButton.click();
        await this.aboutUsLink.click();
    }
}