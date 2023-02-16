# Slacklite server

Back-end built using Node.js + Express + TypeScript

## Installation

1. Clone the repo
2. Run `nvm use` to use this project's version of node, then install dependencies using `npm install`
3. Create `.env` file with the following environment variables:
```
  PORT=5000
  JWT_SECRET_KEY=<SECRET_KEY_STRING>
  BCRYPT_SALT_ROUNDS=<ANY_INTEGER_VALUE>
  PG_HOST=<YOUR_POSTGRES_DATABASE_HOST>
  PG_PORT=<YOUR_POSTGRES_DATABASE_PORT>
  PG_USERNAME=<YOUR_POSTGRES_DATABASE_USERNAME>
  PG_PASSWORD=<YOUR_POSTGRES_DATABASE_PASSWORD>
  PG_DATABASE=<YOUR_POSTGRES_DATABASE_NAME>
  TYPEORM_MIGRATION_DIR=src/migrations/*.ts
```
4. Run migrations using `npm run db:migrate`
5. Start the server using `npm run dev`
