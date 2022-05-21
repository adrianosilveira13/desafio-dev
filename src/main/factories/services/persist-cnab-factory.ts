import { PersistCNABService } from '@/data/services'
import { makePgTransactionsRepo } from '@/main/factories/repos'

export const makePersistCNABService = (): PersistCNABService => {
  return new PersistCNABService(makePgTransactionsRepo(), makePgTransactionsRepo(), makePgTransactionsRepo(), makePgTransactionsRepo())
}
