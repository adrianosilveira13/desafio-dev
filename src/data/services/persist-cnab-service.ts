import { PersistCNAB } from '@/domain/usecases'
import { CheckTransactionTypeRepository, SaveTransactionRepository } from '@/data/protocols/db'

export class PersistCNABService implements PersistCNAB {
  constructor (
    private readonly checkTransactionTypeRepository: CheckTransactionTypeRepository,
    private readonly saveTransactionRepository: SaveTransactionRepository
  ) {}

  async persist (data: PersistCNAB.Params): Promise<boolean> {
    for (const item of data) {
      const isValid = await this.checkTransactionTypeRepository.checkByType(item.type)
      if (!isValid) return false

      const success = await this.saveTransactionRepository.save(item)
      if (!success) return false
    }
    return true
  }
}
