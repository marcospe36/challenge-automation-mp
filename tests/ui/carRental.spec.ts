import { test, expect } from '@playwright/test';
import { PHPTRAVELS_BASE_URL } from '../../src/config/public/web';
import { GUEST_DATA, TEST_CARD } from '../../src/config/public/testData';
import { HomePage } from '../../src/pages/HomePage';
import { CarRentalPage } from '../../src/pages/CarRentalPage';
import { CarDetailsPage } from '../../src/pages/CarDetailsPage';
import { BookingPage } from '../../src/pages/BookingPage';
import { InvoicePage } from '../../src/pages/InvoicePage';
import { ProceedPaymentPage } from '../../src/pages/ProceedPaymentPage';
import { StripePaymentPage } from '../../src/pages/StripePaymentPage';

test(
    'Completar reserva de auto como invitado - flujo mínimo',
    async ({ page }) => {

        const homePage = new HomePage(page);
        const carRentalPage = new CarRentalPage(page);

        await test.step('Ingresar a PHPTravels', async () => {
            await page.goto(PHPTRAVELS_BASE_URL);
            await homePage.waitForPageLoad();
            await homePage.aceptarAvisoInicial();
        });

        await test.step('Seleccionar primer auto de Featured Cars', async () => {
            await carRentalPage.seleccionarPrimerAuto();
        });

        await test.step('Seleccionar Book Now', async () => {
            const carDetailsPage = new CarDetailsPage(page);

            await carDetailsPage.reservar();
        });

        const bookingPage = new BookingPage(page);

        await test.step('Esperar carga de Booking', async () => {
            await bookingPage.waitForPageLoad();
        });

        await test.step('Validar página de Booking', async () => {
            await expect(
                bookingPage.pageTitle
            ).toHaveText('Booking');
        });

        await test.step('Completar datos', async () => {
            await bookingPage.esperarFormularioListo();
            await bookingPage.completarDatos(
                GUEST_DATA.firstName,
                GUEST_DATA.lastName,
                GUEST_DATA.email,
                GUEST_DATA.phone
            );
        });

        await test.step('Aceptar términos y condiciones', async () => {
            await bookingPage.aceptarTerminos();
        });

        await test.step('Confirmar booking', async () => {
            await bookingPage.confirmarBooking();
        });

        const invoicePage = new InvoicePage(
            bookingPage.getPage()
        );

        await test.step('Esperar carga de Invoice', async () => {
            await invoicePage.waitForPageLoad();
        });

        await test.step('Validar Invoice Details', async () => {
            await expect(
                invoicePage.invoiceTitle
            ).toHaveText('Invoice Details',{timeout:10000});
        });

        await test.step('Ir a pago', async () => {
            await invoicePage.hacerPago();
        });

        const proceedPaymentPage = new ProceedPaymentPage(
            bookingPage.getPage()
        );

        await test.step('Esperar carga de Proceed to Payment', async () => {
            await proceedPaymentPage.waitForPageLoad();
        });

        await test.step('Validar pantalla Proceed to Payment', async () => {
            await expect(
                proceedPaymentPage.pageTitle
            ).toHaveText('Proceed to Payment');

            await expect(
                proceedPaymentPage.payWithStripe
            ).toBeVisible();
        });

        await test.step('Continuar al pago', async () => {
            await proceedPaymentPage.continuarAlPago();
        });

        const stripePaymentPage = new StripePaymentPage(
            bookingPage.getPage()
        );

        await test.step('Esperar carga de Stripe', async () => {
            await stripePaymentPage.waitForPageLoad();
        });

        await test.step('Completar datos de tarjeta', async () => {
            await stripePaymentPage.completarDatosTarjeta(
                TEST_CARD.number,
                TEST_CARD.expiration,
                TEST_CARD.cvc,
                TEST_CARD.cardholderName,
                TEST_CARD.country
            );
        });

        await test.step('Realizar pago', async () => {
            await stripePaymentPage.pagar();
        });

        await test.step('Validar pago exitoso', async () => {
            await expect(
                stripePaymentPage.successMessage
            ).toHaveText('Success', {
                timeout: 20000
            });

            await expect(
                stripePaymentPage.paymentSuccessfulMessage
            ).toContainText('Payment successful!', {
                timeout: 20000
            });
        });
    }
);