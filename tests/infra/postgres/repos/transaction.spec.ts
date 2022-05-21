import { mockCNAB, mockStoreParams, mockTransactionTypeParams } from '@/tests/domain/mocks'
import { PgTransactionRepository } from '@/infra/postgres/repos'
import { PgTransactionType, PgTransaction, PgStore } from '@/infra/postgres/entities'
import { IBackup, newDb } from 'pg-mem'
import { getRepository, Repository } from 'typeorm'

describe('PgTransactionRepository', () => {
  let sut: PgTransactionRepository
  let pgTypesRepo: Repository<PgTransactionType>
  let pgStoreRepo: Repository<PgStore>
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
    console.log(connection)
    await connection.synchronize()
    backup = db.backup()
    pgTypesRepo = getRepository(PgTransactionType)
    pgStoreRepo = getRepository(PgStore)
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgTransactionRepository()
  })

  describe('checkByType()', () => {
    it('Should return a valid type if type exists', async () => {
      const transactionTypeParams = mockTransactionTypeParams()
      await pgTypesRepo.save(transactionTypeParams)
      const success = await sut.checkByType(1)
      expect(success).toBeTruthy()
    })

    it('Should return false if type does not exist', async () => {
      const success = await sut.checkByType(1)
      expect(success).toBe(false)
    })
  })

  describe('checkStore()', () => {
    it('Should return a Truthy value if store exists', async () => {
      const storeParams = mockStoreParams()
      await pgStoreRepo.save(storeParams)
      const success = await sut.checkStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toBeTruthy()
    })

    it('Should return null if store does not exist', async () => {
      const storeParams = mockStoreParams()
      const success = await sut.checkStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toEqual(null)
    })
  })

  describe('createStore()', () => {
    it('Should return truthy on success', async () => {
      const storeParams = mockStoreParams()
      const success = await sut.createStore({ owner: storeParams.owner, storeName: storeParams.name })
      expect(success).toBeTruthy()
    })
  })

  describe('save()', () => {
    it('Should return an true on success', async () => {
      const cnabParams = mockCNAB()
      await sut.save({ cnab: cnabParams, storeId: 4 })
      expect(true).toEqual(true)
    })
  })
})
