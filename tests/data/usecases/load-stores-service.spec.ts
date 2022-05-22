import { LoadStoresService } from '@/data/services'
import { LoadStoresRepositorySpy } from '../mocks'

type SutTypes = {
  sut: LoadStoresService
  loadStoresRepositorySpy: LoadStoresRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadStoresRepositorySpy = new LoadStoresRepositorySpy()
  const sut = new LoadStoresService(loadStoresRepositorySpy)
  return {
    sut,
    loadStoresRepositorySpy
  }
}

describe('LoadStoresService Usecase', () => {
  it('Should call LoadStoresRepository', async () => {
    const { sut, loadStoresRepositorySpy } = makeSut()
    await sut.load()
    expect(loadStoresRepositorySpy.callsCount).toBe(1)
  })

  it('Should return null if LoadStoresRepository returns null', async () => {
    const { sut, loadStoresRepositorySpy } = makeSut()
    loadStoresRepositorySpy.result = null
    const response = await sut.load()
    expect(response).toBeNull()
  })
})
