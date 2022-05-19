import { mockAddAccountParams } from '@/tests/domain/mocks'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { IBackup, newDb } from 'pg-mem'
import { getRepository, Repository } from 'typeorm'
import faker from '@faker-js/faker'

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

    it('Should return true on success', async () => {
      const accountParams = mockAddAccountParams()
      await pgUserRepo.findOne({ email: accountParams.email })
      const success = await sut.add(accountParams)
      expect(success).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    it('Should return true if email exists', async () => {
      const addAccountParams = mockAddAccountParams()
      await pgUserRepo.save(addAccountParams)
      const exists = await sut.checkByEmail(addAccountParams.email)
      expect(exists).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    it('Should return an Account on success', async () => {
      const addAccountParams = mockAddAccountParams()
      await pgUserRepo.save(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.password).toBe(addAccountParams.password)
    })

    it('Should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('Should update the account access token on success', async () => {
      const addAccountParams = mockAddAccountParams()
      const res = await pgUserRepo.save(addAccountParams)
      const accessToken = faker.datatype.uuid()
      await sut.updateAccessToken(res.id.toString(), accessToken)
      const account = await pgUserRepo.findOne({ id: res.id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })
})
