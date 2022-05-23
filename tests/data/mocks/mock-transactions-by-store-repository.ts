import { mockTransaction } from '@/tests/domain/mocks'
import { LoadTransactionsByStoreRepository } from '@/data/protocols/db'
import { Transaction } from '@/domain/models'

export class LoadTransactionsByStoreRepositorySpy implements LoadTransactionsByStoreRepository {
  input: LoadTransactionsByStoreRepository.Params
  result = [mockTransaction()]

  async loadTransactions (params: LoadTransactionsByStoreRepository.Params): Promise<Transaction[]> {
    this.input = params
    return this.result
  }
}
