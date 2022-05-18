import { mockAddAccountParams } from '@/tests/domain/mocks'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { IBackup, newDb } from 'pg-mem'
import { getRepository, Repository } from 'typeorm'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
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
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  describe('add()', () => {
    it('Should create an account', async () => {
      const accountParams = mockAddAccountParams()
      await sut.add(accountParams)
      const pgUser = await pgUserRepo.findOne({ email: accountParams.email })
      expect(pgUser?.id).toBe(1)
    })
  })
})
