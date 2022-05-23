import { Transaction } from '@/domain/models'

export interface LoadTransactionByStore {
  loadTransactions(params: LoadTransactionByStore.Params): Promise<LoadTransactionByStore.Result>;
}

export namespace LoadTransactionByStore {
  export type Params = {
    storeId: number
  }
  export type Result = Transaction[] | null
}
