import { LoadStoresService } from '@/data/services'
import { makeStoresRepo } from '@/main/factories/repos'

export const makeLoadStoresService = (): LoadStoresService => {
  return new LoadStoresService(makeStoresRepo())
}
