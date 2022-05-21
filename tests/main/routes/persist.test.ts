import { PgStore, PgTransaction, PgTransactionType } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { mockCNABRaw } from '@/tests/utils/mocks'
import { mockValidCNAB } from '@/tests/utils/mocks/mock-valid-cnab'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'

describe('Persist Routes', () => {
  let connection: any
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
      entities: [PgTransactionType, PgTransaction, PgStore]
    })
    await connection.synchronize()
    backup = db.backup()
    pgTypesRepo = getRepository(PgTransactionType)
    pgTransactionRepo = getRepository(PgTransaction)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('POST /api/persist', () => {
    it('Should return 204', async () => {
      await pgTypesRepo.save({
        description: 'any_desc',
        type: 'any_type',
        signal: '+'
      })
      await pgTypesRepo.save({
        description: 'any_desc2',
        type: 'any_type2',
        signal: '-'
      })
      const { status, body } = await request(app)
        .post('/api/persist')
        .attach('file', Buffer.from(mockCNABRaw()), { filename: 'any_name', contentType: 'text/*' })
      const validCNABS = mockValidCNAB()
      const transaction1 = await pgTransactionRepo.findOne({ document: validCNABS[0].document })
      const transaction2 = await pgTransactionRepo.findOne({ document: validCNABS[1].document })
      expect(status).toBe(204)
      expect(body).toEqual({})
      expect(transaction1.card).toBe(validCNABS[0].card)
      expect(transaction2.card).toBe(validCNABS[1].card)
    })
  })
})
