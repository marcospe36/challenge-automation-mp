# Challenge PlayWright

Prueba técnica de automatización realizada con **Playwright + TypeScript**, incluyendo pruebas de API y UI.

## Requisitos

* Node.js instalado.
* npm instalado.

Verificar instalación:

```bash
node --version
npm --version
```

Instalar dependencias:

```bash
npm install
```

## Estructura

```text
Challenge-automation/

├── src/
│   ├── api/
│   ├── config/
│   │   ├── private/
│   │   └── public/
│   ├── pages/
│   ├── resources/
│   ├── types/
│   └── utils/
│
├── test_data/
│   └── Datos-pruebas.xlsx
│
├── tests/
│   ├── api/
│   └── ui/
│
├── .env
├── .env.example
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Configuración

El ambiente de ejecución se configura mediante el archivo `.env`.

Ejemplo:

```text
ENVIRONMENT=qa
```

Las configuraciones públicas se encuentran en:

```text
src/config/public/
```

Las configuraciones privadas y secretos se encuentran en:

```text
src/config/private/
```

La configuracion privada no queda en el versionado.

Para configurar el proyecto, crear el archivo `.env` a partir de `.env.example` y completar los valores correspondientes.

## Pruebas de API

Las pruebas utilizan **PokeAPI**:

```text
https://pokeapi.co/api/v2/pokemon/
```

Los datos de prueba se encuentran en:

```text
test_data/Datos-pruebas.xlsx
```

Cada fila del archivo representa un caso de prueba.

Se validan:

* Código de respuesta HTTP.
* Nombre del Pokémon.
* Habilidades.
* Tiempo de respuesta menor a 10 segundos.
* Hash SHA-256 del secreto correspondiente al ambiente.
* Fecha y hora de finalización de cada prueba.

Ejecutar las pruebas de API:

```bash
npx playwright test tests/api
```

## Pruebas de UI

Las pruebas utilizan **PHPTravels**:

```text
https://phptravels.net/
```

Se automatizaron los siguientes flujos:

1. Completar una reserva de auto como invitado utilizando una tarjeta de prueba.
2. Buscar disponibilidad de autos indicando origen y destino.
3. Validar el contenido de la página **About Us**.

Las pruebas están implementadas utilizando **Page Object Model (POM)**.

Ejecutar las pruebas de UI:

```bash
npx playwright test tests/ui
```

Ejecutar todas las pruebas:

```bash
npx playwright test
```

## Reporte

Luego de ejecutar las pruebas, se puede visualizar el reporte HTML de Playwright mediante:

```bash
npx playwright show-report
```

## Ambientes

El proyecto permite ejecutar las pruebas utilizando diferentes ambientes.

El ambiente se determina mediante:

```text
ENVIRONMENT
```

Los secretos utilizados por cada ambiente se mantienen separados de la configuración pública y no se exponen en el código ni en el repositorio.