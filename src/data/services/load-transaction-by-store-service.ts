import { LoadTransactionByStore } from '@/domain/usecases'
import { LoadTransactionsByStoreRepository } from '../protocols/db'

export class LoadTransactionByStoreService implements LoadTransactionByStore {
  constructor (private readonly loadTransactionsByStoreRepository: LoadTransactionsByStoreRepository) {}

  async loadTransactions (params: LoadTransactionByStore.Params): Promise<LoadTransactionByStore.Result> {
    const transactions = await this.loadTransactionsByStoreRepository.loadTransactions(params)
    if (!transactions) return null
    return transactions
  }
}
