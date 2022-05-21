import { Store } from '@/domain/models/store'

export interface CreateStoreRepository {
  createStore: (params: CreateStoreRepository.Params) => Promise<CreateStoreRepository.Result>
}

export namespace CreateStoreRepository {
  export type Params = Pick<Store, 'owner' | 'storeName'>
  export type Result = Pick<Store, 'id'> | null
}
