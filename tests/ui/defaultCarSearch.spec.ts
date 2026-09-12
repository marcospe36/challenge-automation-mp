import { test, expect } from '@playwright/test';
import { PHPTRAVELS_BASE_URL } from '../../src/config/public/web';
import { CAR_RENTAL_DATA } from '../../src/config/public/testData';
import { HomePage } from '../../src/pages/HomePage';
import { CarRentalPage } from '../../src/pages/CarRentalPage';
import { SearchPage } from '../../src/pages/SearchPage';

test('Buscar disponibilidad de autos', async ({ page }) => {

    const homePage = new HomePage(page);
    const carRentalPage = new CarRentalPage(page);
    const searchPage = new SearchPage(page);

    await test.step('Ingresar a PHPTravels', async () => {
        await page.goto(PHPTRAVELS_BASE_URL);
        await homePage.waitForPageLoad();
        await homePage.aceptarAvisoInicial();
    });

    await test.step('Seleccionar ubicación de retiro', async () => {
        await carRentalPage.seleccionarOrigen(
            CAR_RENTAL_DATA.pickupLocation
        );
    });

    await test.step('Seleccionar ubicación de devolución', async () => {
        await carRentalPage.seleccionarDestino(
            CAR_RENTAL_DATA.returnLocation
        );
    });

    await test.step('Buscar autos', async () => {
        await carRentalPage.buscarAutos();
    });

    await test.step('Validar búsqueda completada', async () => {
        await expect(
            searchPage.searchCompleteMessage
        ).toHaveText('Search Complete! Found 0 Cars');
    });
});