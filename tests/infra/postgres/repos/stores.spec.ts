import { mockStoreParams } from '@/tests/domain/mocks'
import { PgStoresRepository } from '@/infra/postgres/repos'
import { PgTransactionType, PgTransaction, PgStore } from '@/infra/postgres/entities'
import { IBackup, newDb } from 'pg-mem'
import { getRepository, Repository } from 'typeorm'

describe('PgTransactionRepository', () => {
  let sut: PgStoresRepository
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
      entities: [PgStore, PgTransaction, PgTransactionType]
    })
    await connection.synchronize()
    backup = db.backup()
    pgStoreRepo = getRepository(PgStore)
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgStoresRepository()
  })

  describe('load()', () => {
    it('Should return an array of stores', async () => {
      const storeParams1 = mockStoreParams()
      const storeParams2 = mockStoreParams()
      await pgStoreRepo.save(storeParams1)
      await pgStoreRepo.save(storeParams2)
      const stores = await sut.load()
      expect(stores).toEqual([{
        id: stores[0].id,
        storeName: storeParams1.name,
        owner: storeParams1.owner
      }, {
        id: stores[1].id,
        storeName: storeParams2.name,
        owner: storeParams2.owner
      }])
    })
  })
})
