import { CheckStoreByNameAndOwnerRepository, CheckTransactionTypeRepository, CreateStoreRepository, LoadTransactionsByStoreRepository, SaveTransactionRepository } from '@/data/protocols/db'
import { LoadTransactionByStore } from '@/domain/usecases'
import { PgStore, PgTransaction, PgTransactionType } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

export class PgTransactionRepository implements CheckTransactionTypeRepository, CheckStoreByNameAndOwnerRepository, CreateStoreRepository, SaveTransactionRepository, LoadTransactionsByStoreRepository {
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
      store_id: storeId,
      transaction_type_id: cnab.type
    }
    const result = await transactionRepo.save(validCnab)
    return !!result
  }

  async loadTransactions (params: LoadTransactionByStore.Params): Promise<LoadTransactionByStore.Result> {
    const storesRepo = getRepository(PgStore)
    const storesTransactions = await storesRepo
      .query(`
        SELECT
          s.name AS storename,
          t.date,
          t.amount,
          t.document,
          t.card,
          tt.description,
          tt.type,
          tt.signal
        FROM
          stores AS s LEFT JOIN transaction AS t ON (s.id = t.store_id)
          LEFT JOIN "transactionType" AS tt ON (t.transaction_type_id = tt.id)
        WHERE
          s.id = ${params.storeId};
      `)
    return storesTransactions
  }
}
