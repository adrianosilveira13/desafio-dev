import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository {
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

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const account = await pgUserRepo.findOne({ email })
    if (!account) return null
    return {
      id: (account.id).toString(),
      name: account.name,
      password: account.password
    }
  }
}
