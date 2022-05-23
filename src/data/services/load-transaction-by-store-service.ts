import { Transaction } from '@/domain/models'
import { LoadTransactionByStore } from '@/domain/usecases'
import { LoadTransactionsByStoreRepository } from '../protocols/db'

export class LoadTransactionByStoreService implements LoadTransactionByStore {
  constructor (private readonly loadTransactionsByStoreRepository: LoadTransactionsByStoreRepository) {}

  async loadTransactions (params: LoadTransactionByStore.Params): Promise<Transaction[]> {
    await this.loadTransactionsByStoreRepository.loadTransactions(params)
    return Promise.resolve(null)
  }
}
