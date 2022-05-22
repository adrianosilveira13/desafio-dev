import { AccessDeniedError, NotFoundError } from '@/application/errors'
import { PgStore, PgTransaction, PgTransactionType, PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { mockStoreParams } from '@/tests/domain/mocks'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import env from '@/main/config/env'

describe('Login Routes', () => {
  let connection: any
  let pgStoreRepo: Repository<PgStore>
  let pgUserRepo: Repository<PgUser>
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
      entities: [PgStore, PgTransaction, PgTransactionType, PgUser]
    })
    await connection.synchronize()
    backup = db.backup()
    pgStoreRepo = getRepository(PgStore)
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('GET /api/stores', () => {
    it('Should return 200 with stores', async () => {
      const password = await hash('123', 12)
      const res = await pgUserRepo.save({
        name: 'Adriano',
        email: 'adriano@mail.com',
        password
      })
      const id = res.id.toString()
      const accesstoken = sign({ id }, env.jwtSecret)
      await pgUserRepo
        .createQueryBuilder()
        .update(PgUser)
        .set({
          accesstoken
        })
        .where('id = :id', { id })
        .execute()
      const fakeStore = mockStoreParams()
      const fakeStore2 = mockStoreParams()
      const store = await pgStoreRepo.save([fakeStore, fakeStore2])
      const response = await request(app)
        .get('/api/stores')
        .set('accesstoken', accesstoken)
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
    const password = await hash('123', 12)
    const res = await pgUserRepo.save({
      name: 'Adriano',
      email: 'adriano@mail.com',
      password
    })
    const id = res.id.toString()
    const accesstoken = sign({ id }, env.jwtSecret)
    await pgUserRepo
      .createQueryBuilder()
      .update(PgUser)
      .set({
        accesstoken
      })
      .where('id = :id', { id })
      .execute()
    const response = await request(app)
      .get('/api/stores')
      .set('accesstoken', accesstoken)
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: new NotFoundError().message })
  })

  it('Should return 403 if no accesstoken is provided', async () => {
    const response = await request(app)
      .get('/api/stores')
    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ error: new AccessDeniedError().message })
  })
})
