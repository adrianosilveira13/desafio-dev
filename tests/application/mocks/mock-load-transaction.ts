import { LoadTransactionByStore } from '@/domain/usecases'
import { mockTransaction } from '@/tests/domain/mocks'

export class LoadTransactionByStoreSpy implements LoadTransactionByStore {
  input: LoadTransactionByStore.Params | null
  result = {
    transactions: [mockTransaction()],
    total: 0
  }

  async loadTransactions (params: LoadTransactionByStore.Params): Promise<LoadTransactionByStore.Result> {
    this.input = params
    return this.result
  }
}
