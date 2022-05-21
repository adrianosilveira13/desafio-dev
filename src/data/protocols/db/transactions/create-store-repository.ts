import { Store } from '@/domain/models/store'
import { PgStore } from '@/infra/postgres/entities'

export interface CreateStoreRepository {
  createStore: (params: CreateStoreRepository.Params) => Promise<CreateStoreRepository.Result>
}

export namespace CreateStoreRepository {
  export type Params = Pick<Store, 'owner' | 'storeName'>
  export type Result = PgStore | null
}
