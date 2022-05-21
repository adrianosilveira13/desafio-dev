import { CreateStoreRepository } from '@/data/protocols/db'
import faker from '@faker-js/faker'

export class CreateStoreRepositorySpy implements CreateStoreRepository {
  data = []
  callsCount = 0
  result: CreateStoreRepository.Result | null = { id: faker.datatype.number() }

  async createStore (params: CreateStoreRepository.Params): Promise<CreateStoreRepository.Result> {
    this.data.push(params)
    this.callsCount++
    return this.result
  }
}
