import { BasePage } from './BasePage';

export class AboutUsPage extends BasePage {

    readonly pageTitle = this.page.getByRole('heading', {name: 'About us'});
    readonly pageContent = this.page.locator('div.prose.prose-lg.max-w-none');

}