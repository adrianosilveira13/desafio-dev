import { LoadTransactionByStoreService } from '@/data/services'
import { makePgTransactionsRepo } from '@/main/factories/repos'

export const makeLoadTransactionByStoreService = (): LoadTransactionByStoreService => {
  return new LoadTransactionByStoreService(makePgTransactionsRepo())
}
