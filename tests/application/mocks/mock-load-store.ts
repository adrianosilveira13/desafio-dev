import { LoadStores } from '@/domain/usecases'

export class LoadStoresSpy implements LoadStores {
  callsCount = 0

  async load (): Promise<LoadStores.Result> {
    this.callsCount++
    return Promise.resolve(null)
  }
}
