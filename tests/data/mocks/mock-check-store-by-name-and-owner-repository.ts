import { CheckStoreByNameAndOwnerRepository } from '@/data/protocols/db'

export class CheckStoreByNameAndOwnerRepositorySpy implements CheckStoreByNameAndOwnerRepository {
  data = []
  callsCount = 0

  async checkStore (params: CheckStoreByNameAndOwnerRepository.Params): Promise<CheckStoreByNameAndOwnerRepository.Result> {
    this.data.push(params)
    this.callsCount++
    return Promise.resolve(null)
  }
}
