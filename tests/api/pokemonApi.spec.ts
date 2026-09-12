import { test, expect } from '@playwright/test';
import { obtenerPokemon } from '../../src/api/pokemonApi';
import { leerExcel } from '../../src/utils/excelHelper';
import { SECRET_ENCRYPTED } from '../../src/config/private/environment';

const datos = leerExcel('test_data/Datos-pruebas.xlsx');

for (const pokemon of datos) {

    test(`Consultar ${pokemon.name} por ID`, async ({ request }) => {
        console.log(`Secret SHA-256: ${SECRET_ENCRYPTED}`);

        const inicio = Date.now();
        const response = await obtenerPokemon(request, pokemon.id);
        const tiempoRespuesta = Date.now() - inicio;
        console.log(`Tiempo de respuesta: ${tiempoRespuesta} ms`);

        expect(response.status()).toBe(200);
        expect(tiempoRespuesta).toBeLessThan(10000);

        const resultado = await response.json();
        expect(resultado.name).toBe(pokemon.name);

        const abilities = resultado.abilities.map((item: { ability: { name: string } }) => item.ability.name);
        expect(abilities).toEqual(expect.arrayContaining(pokemon.abilities));

        console.log(`Fecha y hora de finalización del test: ${new Date().toISOString()}`);
    });

    test(`Consultar ${pokemon.name} por nombre`, async ({ request }) => {
        console.log(`Secret SHA-256: ${SECRET_ENCRYPTED}`);

        const inicio = Date.now();
        const response = await obtenerPokemon(request, pokemon.name);
        const tiempoRespuesta = Date.now() - inicio;
        console.log(`Tiempo de respuesta: ${tiempoRespuesta} ms`);

        
        expect(response.status()).toBe(200);
        expect(tiempoRespuesta).toBeLessThan(10000);

        const resultado = await response.json();
        expect(resultado.name).toBe(pokemon.name);

        const abilities = resultado.abilities.map((item: { ability: { name: string } }) => item.ability.name);
        expect(abilities).toEqual(expect.arrayContaining(pokemon.abilities));

        console.log(`Fecha y hora de finalización del test: ${new Date().toISOString()}`);

    });
}