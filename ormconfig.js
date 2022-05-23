module.exports = {
  type: 'postgres',
  host: process.env.PGHOST || 'kesavan.db.elephantsql.com',
  port: 5432,
  username: process.env.PGUSER || 'mfbupqzp',
  password: process.env.PGPASS || 'Ts7VpH7jLU0NVTHnjyei-I2hDUuOWpPi',
  database: process.env.PGDBNAME || 'mfbupqzp',
  entities: [
    'dist/infra/postgres/entities/**/*.js'
  ],
  migrations: [
    'dist/infra/postgres/migrations/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/infra/postgres/entities',
    migrationsDir: 'src/infra/postgres/migrations'
  }
}
