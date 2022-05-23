import { mockTransaction } from '@/tests/domain/mocks'
import { LoadTransactionsByStoreRepository } from '@/data/protocols/db'

export class LoadTransactionsByStoreRepositorySpy implements LoadTransactionsByStoreRepository {
  input: LoadTransactionsByStoreRepository.Params
  result = {
    transactions: [mockTransaction()],
    total: 0
  }

  async loadTransactions (params: LoadTransactionsByStoreRepository.Params): Promise<LoadTransactionsByStoreRepository.Result> {
    this.input = params
    return this.result
  }
}
