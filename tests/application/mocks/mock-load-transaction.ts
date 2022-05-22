import { Transaction } from '@/domain/models'
import { LoadTransactionByStore } from '@/domain/usecases'

export class LoadTransactionByStoreSpy implements LoadTransactionByStore {
  input: LoadTransactionByStore.Params | null

  async loadTransaction (params: LoadTransactionByStore.Params): Promise<Transaction[]> {
    this.input = params
    return Promise.resolve(null)
  }
}
