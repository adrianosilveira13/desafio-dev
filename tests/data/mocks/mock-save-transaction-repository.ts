import { SaveTransactionRepository } from '@/data/protocols/db'

export class SaveTransactionRepositorySpy implements SaveTransactionRepository {
  transactions: SaveTransactionRepository.Params[] = []
  callsCount = 0
  result = true

  async save (transaction: SaveTransactionRepository.Params): Promise<boolean> {
    this.transactions.push({ cnab: transaction.cnab, storeId: transaction.storeId })
    this.callsCount++
    return this.result
  }
}
