import { LoadStores } from '@/domain/usecases'
import { LoadStoresRepository } from '../protocols/db/stores'

export class LoadStoresService implements LoadStores {
  constructor (private readonly loadStoresRepository: LoadStoresRepository) {}

  async load (): Promise<LoadStores.Result> {
    const stores = await this.loadStoresRepository.load()
    if (!stores) return null
    return stores
  }
}
