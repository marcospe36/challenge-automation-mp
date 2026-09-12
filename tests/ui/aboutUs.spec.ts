import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { PHPTRAVELS_BASE_URL } from '../../src/config/public/web';
import { HomePage } from '../../src/pages/HomePage';
import { TopMenuPage } from '../../src/pages/TopMenuPage';
import { AboutUsPage } from '../../src/pages/AboutUsPage';

test('Validar contenido de About Us', async ({ page }) => {

    const homePage = new HomePage(page);
    const topMenuPage = new TopMenuPage(page);
    const aboutUsPage = new AboutUsPage(page);

    await test.step('Ingresar a PHPTravels', async () => {
        await page.goto(PHPTRAVELS_BASE_URL);
        await homePage.waitForPageLoad();
        await homePage.aceptarAvisoInicial();
    });

    await test.step('Navegar a About Us', async () => {
        await topMenuPage.irAAboutUs();
    });

    await test.step('Validar título de About Us', async () => {
        await expect(aboutUsPage.pageTitle).toHaveText('About us');
    });

    await test.step('Validar contenido de About Us', async () => {
        const expectedContent = readFileSync(
            'src/resources/about-us.txt',
            'utf-8'
        )
            .split('\n')
            .map(text => text.trim())
            .filter(Boolean);

        for (const text of expectedContent) {
            await expect(aboutUsPage.pageContent).toContainText(text);
        }
    });
});
