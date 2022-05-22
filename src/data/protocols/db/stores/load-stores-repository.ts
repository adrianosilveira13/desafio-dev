import { LoadStores } from '@/domain/usecases'

export interface LoadStoresRepository {
  load(): Promise<LoadStoresRepository.Result>
}

export namespace LoadStoresRepository {
  export type Result = LoadStores.Result
}
