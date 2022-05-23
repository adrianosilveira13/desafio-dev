import { PgStore, PgTransaction, PgTransactionType, PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { mockCNAB, mockStoreParams, mockTransactionTypeParams } from '@/tests/domain/mocks'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'
import env from '@/main/config/env'
import faker from '@faker-js/faker'

describe('Login Routes', () => {
  let connection: any
  let pgStoreRepo: Repository<PgStore>
  let pgUserRepo: Repository<PgUser>
  let pgTypesRepo: Repository<PgTransactionType>
  let pgTransactionRepo: Repository<PgTransaction>
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
    pgTypesRepo = getRepository(PgTransactionType)
    pgTransactionRepo = getRepository(PgTransaction)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('GET /api/transactions/:id', () => {
    it('Should return 200 with transactions', async () => {
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
      const response = await request(app)
        .get(`/api/transactions/${validStore.id}`)
        .set('accesstoken', accesstoken)
      expect(response.statusCode).toBe(200)
    })

    it('Should return 404 if there is no transactions', async () => {
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
        .get(`/api/transactions/${faker.datatype.number()}`)
        .set('accesstoken', accesstoken)
      expect(response.statusCode).toBe(404)
    })
  })
})
