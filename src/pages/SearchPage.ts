import { BasePage } from './BasePage';

export class SearchPage extends BasePage {

    readonly searchCompleteMessage = this.page.getByText('Search Complete!');

}