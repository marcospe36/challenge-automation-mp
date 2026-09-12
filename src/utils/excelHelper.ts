import * as XLSX from 'xlsx';
import { PokemonTestData } from '../types/pokemon';

export function leerExcel(rutaArchivo: string): PokemonTestData[] {
    const workbook = XLSX.readFile(rutaArchivo);

    const nombreHoja = workbook.SheetNames[0];
    const hoja = workbook.Sheets[nombreHoja];

    const filas = XLSX.utils.sheet_to_json<{id: number; name: string; abilities: string;}>(hoja);

    return filas.map(fila => ({
        id: fila.id,
        name: fila.name,
        abilities: fila.abilities
            .split(',')
            .map(ability => ability.trim())
    }));
    
}