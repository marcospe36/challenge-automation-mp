import { APIRequestContext } from '@playwright/test';
import { POKEAPI_BASE_URL } from '../config/public/api';

export async function obtenerPokemon(request: APIRequestContext, identificador: string | number) {
    return await request.get(`${POKEAPI_BASE_URL}/pokemon/${identificador}`);
}