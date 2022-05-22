import { LoadStoresRepository } from '@/data/protocols/db/stores'
import { mockValidStore } from '@/tests/domain/mocks'

export class LoadStoresRepositorySpy implements LoadStoresRepository {
  callsCount = 0
  result = [mockValidStore()]

  async load (): Promise<LoadStoresRepository.Result> {
    this.callsCount++
    return this.result
  }
}
