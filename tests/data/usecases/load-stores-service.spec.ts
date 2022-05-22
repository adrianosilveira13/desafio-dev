import { LoadStoresService } from '@/data/services'
import { LoadStoresRepository } from '@/data/protocols/db/stores'

describe('LoadStoresService Usecase', () => {
  it('Should call LoadStoresRepository', async () => {
    class LoadStoresRepositorySpy implements LoadStoresRepository {
      callsCount = 0

      async load (): Promise<LoadStoresRepository.Result> {
        this.callsCount++
        return Promise.resolve(null)
      }
    }
    const loadStoresRepositorySpy = new LoadStoresRepositorySpy()
    const sut = new LoadStoresService(loadStoresRepositorySpy)
    await sut.load()
    expect(loadStoresRepositorySpy.callsCount).toBe(1)
  })
})
