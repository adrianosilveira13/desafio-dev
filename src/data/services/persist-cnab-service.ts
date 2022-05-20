import { PersistCNAB } from '@/domain/usecases'
import { CheckTransactionTypeRepository } from '../protocols/db/transactions'

export class PersistCNABService implements PersistCNAB {
  constructor (private readonly checkTransactionTypeRepository: CheckTransactionTypeRepository) {}

  async persist (data: PersistCNAB.Params): Promise<boolean> {
    for (const item of data) {
      const isValid = await this.checkTransactionTypeRepository.checkByType(item.type)
      if (!isValid) return false
    }
    return true
  }
}
