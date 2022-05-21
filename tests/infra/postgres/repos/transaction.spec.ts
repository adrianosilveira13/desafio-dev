import { mockStoreParams, mockTransactionTypeParams } from '@/tests/domain/mocks'
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
  })
})
