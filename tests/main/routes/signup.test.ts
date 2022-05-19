import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'

import { IBackup, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('SignUp Routes', () => {
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
      entities: [PgUser]
    })
    await connection.synchronize()
    backup = db.backup()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('POST /api/signup', () => {
    it('Should return 200 with AccessToken', async () => {
      const { status, body } = await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
      expect(status).toBe(200)
      expect(body.accessToken).toBeTruthy()
    })
  })
})
