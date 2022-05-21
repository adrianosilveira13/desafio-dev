import { PersistCNAB } from '@/domain/usecases'
import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, CreateStoreRepository, SaveTransactionRepository } from '@/data/protocols/db'

export class PersistCNABService implements PersistCNAB {
  constructor (
    private readonly checkTransactionTypeRepository: CheckTransactionTypeRepository,
    private readonly checkStoreByNameAndOwnerRepository: CheckStoreByNameAndOwnerRepository,
    private readonly createStoreRepository: CreateStoreRepository,
    private readonly saveTransactionRepository: SaveTransactionRepository
  ) {}

  async persist (data: PersistCNAB.Params): Promise<boolean> {
    for (const item of data) {
      const store = { owner: item.owner, storeName: item.storeName }

      const validType = await this.checkTransactionTypeRepository.checkByType(item.type)
      if (!validType) return false

      const storeExists = await this.checkStoreByNameAndOwnerRepository.checkStore(store)

      if (storeExists) {
        const success = await this.saveTransactionRepository.save({ cnab: item, storeId: storeExists.id })
        if (!success) return false
      } else {
        const newStore = await this.createStoreRepository.createStore(store)
        const success = await this.saveTransactionRepository.save({ cnab: item, storeId: newStore.id })
        if (!success) return false
      }
    }
    return true
  }
}
