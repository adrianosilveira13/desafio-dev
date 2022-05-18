import { AddAccountRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const account = await pgUserRepo.save({
      name: data.name,
      email: data.email,
      password: data.password
    })
    return account !== null
  }
}
