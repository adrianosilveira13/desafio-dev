module.exports = {
  type: 'postgres',
  host: process.env.PGHOST || 'http://localhost:5432',
  port: 5432,
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASS || 'postgres',
  database: process.env.PGDBNAME || 'desafio',
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
