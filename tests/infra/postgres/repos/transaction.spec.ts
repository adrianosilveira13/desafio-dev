import { mockCNAB, mockStoreParams, mockTransactionTypeParams } from '@/tests/domain/mocks'
import { PgTransactionRepository } from '@/infra/postgres/repos'
import { PgTransactionType, PgTransaction, PgStore } from '@/infra/postgres/entities'
import { IBackup, newDb } from 'pg-mem'
import { getRepository, Repository } from 'typeorm'
import faker from '@faker-js/faker'

describe('PgTransactionRepository', () => {
  let sut: PgTransactionRepository
  let pgTypesRepo: Repository<PgTransactionType>
  let pgStoreRepo: Repository<PgStore>
  let pgTransactionRepo: Repository<PgTransaction>
  let connection: any
  let backup: IBackup

  beforeAll(async () => {
    const db = newDb({
      autoCreateForeignKeyIndices: true
    })

    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database'
    })

    connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [PgTransactionType, PgTransaction, PgStore]
    })
    await connection.synchronize()
    backup = db.backup()
    pgTypesRepo = getRepository(PgTransactionType)
    pgStoreRepo = getRepository(PgStore)
    pgTransactionRepo = getRepository(PgTransaction)
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgTransactionRepository()
  })

  describe('checkByType()', () => {
    it('Should return true if type exists', async () => {
      const transactionTypeParams = mockTransactionTypeParams()
      await pgTypesRepo.save(transactionTypeParams)
      const success = await sut.checkByType(1)
      expect(success).toBe(true)
    })

    it('Should return false if type does not exist', async () => {
      const success = await sut.checkByType(1)
      expect(success).toBe(false)
    })
  })

  describe('checkStore()', () => {
    it('Should return an id if store exists', async () => {
      const storeParams = mockStoreParams()
      await pgStoreRepo.save(storeParams)
      const success = await sut.checkStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toEqual({ id: 1 })
    })

    it('Should return null if store does not exist', async () => {
      const storeParams = mockStoreParams()
      const success = await sut.checkStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toEqual(null)
    })
  })

  describe('createStore()', () => {
    it('Should return an id on success', async () => {
      const storeParams = mockStoreParams()
      const success = await sut.createStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toEqual({ id: 1 })
    })
  })

  describe('save()', () => {
    it('Should return true on success', async () => {
      const cnab = mockCNAB()
      const validStore = await pgStoreRepo.save(mockStoreParams())
      const transactionType = await pgTypesRepo.save(mockTransactionTypeParams())
      cnab.type = transactionType.id
      const success = await sut.save({ cnab, storeId: validStore.id })
      expect(success).toBe(true)
    })
  })

  describe('loadTransactions()', () => {
    it('Should return an array of LoadByStore on success', async () => {
      const cnab = mockCNAB()
      const cnab2 = mockCNAB()
      const validStore = await pgStoreRepo.save(mockStoreParams())
      const transactionType = await pgTypesRepo.save(mockTransactionTypeParams())
      const transactionNegative = mockTransactionTypeParams()
      transactionNegative.signal = '-'
      const transactionType2 = await pgTypesRepo.save(transactionNegative)
      await pgTransactionRepo.save([{
        amount: cnab.amount,
        document: cnab.document,
        date: cnab.date,
        card: cnab.card,
        store_id: validStore.id,
        transaction_type_id: transactionType.id
      }, {
        amount: cnab2.amount,
        document: cnab2.document,
        date: cnab2.date,
        card: cnab2.card,
        store_id: validStore.id,
        transaction_type_id: transactionType2.id
      }])
      const result = await sut.loadTransactions({ storeId: validStore.id })
      expect(result).toBeTruthy()
    })

    it('Should return null if no Transaction were found', async () => {
      const result = await sut.loadTransactions({ storeId: faker.datatype.number() })
      expect(result).toBeNull()
    })
  })
})
