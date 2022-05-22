import { NotFoundError } from '@/application/errors'
import { PgStore, PgTransaction, PgTransactionType } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { mockStoreParams } from '@/tests/domain/mocks'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'

describe('Login Routes', () => {
  let connection: any
  let pgStoreRepo: Repository<PgStore>
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
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('GET /api/stores', () => {
    it('Should return 200 with stores', async () => {
      const fakeStore = mockStoreParams()
      const fakeStore2 = mockStoreParams()
      const store = await pgStoreRepo.save([fakeStore, fakeStore2])
      const response = await request(app)
        .get('/api/stores')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([{
        id: store[0].id,
        storeName: fakeStore.name,
        owner: fakeStore.owner
      }, {
        id: store[1].id,
        storeName: fakeStore2.name,
        owner: fakeStore2.owner
      }])
    })
  })

  it('Should return 404 with custom error', async () => {
    const response = await request(app)
      .get('/api/stores')
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: new NotFoundError().message })
  })
})
