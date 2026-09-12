import 'dotenv/config';
import * as crypto from 'crypto';

const environment = process.env.ENVIRONMENT?.toUpperCase();

let secret: string;

switch (environment) {
    case 'QA':
        secret = process.env.SECRET_QA ?? '';
        break;
    case 'CERT':
        secret = process.env.SECRET_CERT ?? '';
        break;
    default:
        throw new Error( `Ambiente no válido: ${process.env.ENVIRONMENT}`);
}

if (!secret) {
    throw new Error(`No se encontró secret key para el ambiente ${environment}`);
}

export const SECRET_ENCRYPTED = crypto
    .createHash('sha256')
    .update(secret)
    .digest('hex');