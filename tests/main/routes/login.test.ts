import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { hash } from 'bcrypt'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection, getRepository, Repository } from 'typeorm'

describe('Login Routes', () => {
  let connection: any
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
      entities: [PgUser]
    })
    await connection.synchronize()
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('POST /api/login', () => {
    it('Should return 200 with AccessToken', async () => {
      const password = await hash('123', 12)
      await pgUserRepo.save({
        name: 'Adriano',
        email: 'adriano@mail.com',
        password
      })
      const { status, body } = await request(app)
        .post('/api/login')
        .send({
          email: 'adriano@mail.com',
          password: '123'
        })
      expect(status).toBe(200)
      expect(body.accesstoken).toBeTruthy()
    })
  })
})
