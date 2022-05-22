import { LoadStoresController } from '@/application/controllers'
import { LoadStoresSpy } from '@/tests/application/mocks'

type SutTypes = {
  sut: LoadStoresController
  loadStoresSpy: LoadStoresSpy
}

const makeSut = (): SutTypes => {
  const loadStoresSpy = new LoadStoresSpy()
  const sut = new LoadStoresController(loadStoresSpy)
  return {
    sut,
    loadStoresSpy
  }
}

describe('LoadStores Controller', () => {
  it('Should call LoadStores', async () => {
    const { sut, loadStoresSpy } = makeSut()
    await sut.handle()
    expect(loadStoresSpy.callsCount).toBe(1)
  })
})
