import { LoadStoresRepository } from '@/data/protocols/db/stores'
import { getRepository } from 'typeorm'
import { PgStore } from '../entities'

export class PgStoresRepository implements LoadStoresRepository {
  async load (): Promise<LoadStoresRepository.Result> {
    const storesRepo = getRepository(PgStore)
    const stores = await storesRepo
      .createQueryBuilder()
      .select(['id, name AS "storeName", owner'])
      .getRawMany()
    if (stores.length === 0) return null
    return stores
  }
}
