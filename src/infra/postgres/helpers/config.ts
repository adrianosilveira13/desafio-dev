import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'mfbupqzp',
  password: 'Ts7VpH7jLU0NVTHnjyei-I2hDUuOWpPi',
  database: 'mfbupqzp',
  entities: ['dist/infra/postgres/entities/index.js']
}
