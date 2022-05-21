import { CheckStoreByNameAndOwnerRepository } from '@/data/protocols/db'
import faker from '@faker-js/faker'

export class CheckStoreByNameAndOwnerRepositorySpy implements CheckStoreByNameAndOwnerRepository {
  data = []
  callsCount = 0
  result: CheckStoreByNameAndOwnerRepository.Result | null = { id: faker.datatype.number() }

  async checkStore (params: CheckStoreByNameAndOwnerRepository.Params): Promise<CheckStoreByNameAndOwnerRepository.Result> {
    this.data.push(params)
    this.callsCount++
    return this.result
  }
}
