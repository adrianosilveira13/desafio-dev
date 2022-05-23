import { Transaction } from '@/domain/models'
import { LoadTransactionByStore } from '@/domain/usecases'
import { mockTransaction } from '@/tests/domain/mocks'

export class LoadTransactionByStoreSpy implements LoadTransactionByStore {
  input: LoadTransactionByStore.Params | null
  result = [mockTransaction()]

  async loadTransactions (params: LoadTransactionByStore.Params): Promise<Transaction[]> {
    this.input = params
    return this.result
  }
}
