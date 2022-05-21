import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, CreateStoreRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgStore, PgTransactionType } from '../entities'

export class PgTransactionRepository implements CheckTransactionTypeRepository, CheckStoreByNameAndOwnerRepository, CreateStoreRepository {
  async checkByType (type: number): Promise<boolean> {
    const transactionTypeRepo = getRepository(PgTransactionType)
    const transactionType = await transactionTypeRepo.findOne({ id: type })
    if (!transactionType) return false
    return true
  }

  async checkStore (params: CheckStoreByNameAndOwnerRepository.Params): Promise<CheckStoreByNameAndOwnerRepository.Result> {
    const storeRepo = getRepository(PgStore)
    const store = await storeRepo.findOne({ owner: params.owner, name: params.storeName })
    if (!store) return null
    return { id: store.id }
  }

  async createStore (params: CreateStoreRepository.Params): Promise<CreateStoreRepository.Result> {
    const storeRepo = getRepository(PgStore)
    const store = await storeRepo.save({ owner: params.owner, name: params.storeName })
    if (!store) return null
    return { id: store.id }
  }
}
