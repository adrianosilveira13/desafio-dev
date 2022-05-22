import { PgStoresRepository } from '@/infra/postgres/repos'

export const makeStoresRepo = (): PgStoresRepository => {
  return new PgStoresRepository()
}
