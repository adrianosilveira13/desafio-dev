import { Store } from '@/domain/models/store'
import { PgStore } from '@/infra/postgres/entities'

export interface CheckStoreByNameAndOwnerRepository {
  checkStore: (params: CheckStoreByNameAndOwnerRepository.Params) => Promise<CheckStoreByNameAndOwnerRepository.Result>
}

export namespace CheckStoreByNameAndOwnerRepository {
  export type Params = Pick<Store, 'owner' | 'storeName'>
  export type Result = PgStore | null
}
