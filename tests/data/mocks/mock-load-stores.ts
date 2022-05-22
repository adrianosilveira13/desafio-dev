import { LoadStoresRepository } from '@/data/protocols/db/stores'

export class LoadStoresRepositorySpy implements LoadStoresRepository {
  callsCount = 0

  async load (): Promise<LoadStoresRepository.Result> {
    this.callsCount++
    return Promise.resolve(null)
  }
}
