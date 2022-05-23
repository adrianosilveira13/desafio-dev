import { LoadTransactionByStore } from '@/domain/usecases'

export interface LoadTransactionsByStoreRepository {
  loadTransactions: (params: LoadTransactionsByStoreRepository.Params) => Promise<LoadTransactionsByStoreRepository.Result>
}

export namespace LoadTransactionsByStoreRepository {
  export type Params = LoadTransactionByStore.Params
  export type Result = LoadTransactionByStore.Result
}
