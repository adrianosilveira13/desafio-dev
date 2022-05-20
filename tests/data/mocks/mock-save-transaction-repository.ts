import { SaveTransactionRepository } from '@/data/protocols/db'
import { CNAB } from '@/domain/models'

export class SaveTransactionRepositorySpy implements SaveTransactionRepository {
  transactions: CNAB[] = []
  callsCount = 0
  result = true

  async save (transaction: CNAB): Promise<boolean> {
    this.transactions.push(transaction)
    this.callsCount++
    return this.result
  }
}
