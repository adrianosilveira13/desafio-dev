import { PersistCNAB } from '@/domain/usecases'
import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, SaveTransactionRepository } from '@/data/protocols/db'

export class PersistCNABService implements PersistCNAB {
  constructor (
    private readonly checkTransactionTypeRepository: CheckTransactionTypeRepository,
    private readonly checkStoreByNameAndOwnerRepository: CheckStoreByNameAndOwnerRepository,
    private readonly saveTransactionRepository: SaveTransactionRepository
  ) {}

  async persist (data: PersistCNAB.Params): Promise<boolean> {
    for (const item of data) {
      const isValid = await this.checkTransactionTypeRepository.checkByType(item.type)
      if (!isValid) return false

      await this.checkStoreByNameAndOwnerRepository.checkStore({ owner: item.owner, storeName: item.storeName })

      const success = await this.saveTransactionRepository.save(item)
      if (!success) return false
    }
    return true
  }
}
