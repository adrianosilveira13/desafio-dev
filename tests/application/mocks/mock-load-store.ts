import { LoadStores } from '@/domain/usecases'
import { mockValidStore } from '@/tests/domain/mocks'

export class LoadStoresSpy implements LoadStores {
  callsCount = 0
  result = [mockValidStore()]

  async load (): Promise<LoadStores.Result> {
    this.callsCount++
    return this.result
  }
}
