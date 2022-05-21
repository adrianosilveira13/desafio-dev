import { Store } from '@/domain/models/store'

export interface CheckStoreByNameAndOwnerRepository {
  checkStore: (params: CheckStoreByNameAndOwnerRepository.Params) => Promise<CheckStoreByNameAndOwnerRepository.Result>
}

export namespace CheckStoreByNameAndOwnerRepository {
  export type Params = Pick<Store, 'owner' | 'storeName'>
  export type Result = Pick<Store, 'id'> | null
}
