import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const account = await pgUserRepo.save({
      name: data.name,
      email: data.email,
      password: data.password
    })
    return account !== undefined
  }

  async checkByEmail (email: string): Promise<boolean> {
    const pgUserRepo = getRepository(PgUser)
    const account = await pgUserRepo.findOne({ email })
    return account !== undefined
  }
}
