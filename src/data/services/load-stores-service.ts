import { LoadStores } from '@/domain/usecases'
import { LoadStoresRepository } from '../protocols/db/stores'

export class LoadStoresService implements LoadStores {
  constructor (private readonly loadStoresRepository: LoadStoresRepository) {}

  async load (): Promise<LoadStores.Result> {
    await this.loadStoresRepository.load()
    return Promise.resolve(null)
  }
}
