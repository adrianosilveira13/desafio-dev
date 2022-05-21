import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, CreateStoreRepository, SaveTransactionRepository } from '@/data/protocols/db'
import { PgStore, PgTransaction, PgTransactionType } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

export class PgTransactionRepository implements CheckTransactionTypeRepository, CheckStoreByNameAndOwnerRepository, CreateStoreRepository, SaveTransactionRepository {
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

  async save ({ cnab, storeId }: SaveTransactionRepository.Params): Promise<boolean> {
    const transactionRepo = getRepository(PgTransaction)
    const validCnab = {
      date: cnab.date,
      amount: cnab.amount,
      card: cnab.card,
      document: cnab.document,
      storeId,
      transactionTypeId: cnab.type
    }
    const result = await transactionRepo.save(validCnab)
    return !!result
  }
}
