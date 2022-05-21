import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, CreateStoreRepository, SaveTransactionRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgStore, PgTransaction, PgTransactionType } from '@/infra/postgres/entities'

export class PgTransactionRepository implements CheckTransactionTypeRepository, CheckStoreByNameAndOwnerRepository, CreateStoreRepository, SaveTransactionRepository {
  async checkByType (type: number): Promise<CheckTransactionTypeRepository.Result> {
    const transactionTypeRepo = getRepository(PgTransactionType)
    const transactionType = await transactionTypeRepo.findOne({ id: type })
    if (!transactionType) return false
    return transactionType
  }

  async checkStore (params: CheckStoreByNameAndOwnerRepository.Params): Promise<CheckStoreByNameAndOwnerRepository.Result> {
    const storeRepo = getRepository(PgStore)
    const store = await storeRepo.findOne({ owner: params.owner, name: params.storeName })
    if (!store) return null
    return store
  }

  async createStore (params: CreateStoreRepository.Params): Promise<CreateStoreRepository.Result> {
    const storeRepo = getRepository(PgStore)
    const store = await storeRepo.save({ owner: params.owner, name: params.storeName })
    if (!store) return null
    return { id: store.id }
  }

  async save ({ cnab, storeId }: SaveTransactionRepository.Params): Promise<boolean> {
    getRepository(PgTransaction)
    return Promise.resolve(null)
  }
}
