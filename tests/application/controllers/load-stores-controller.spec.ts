import { LoadStoresController } from '@/application/controllers'
import { LoadStoresSpy } from '@/tests/application/mocks'
import { notFound, ok, serverError } from '@/application/helpers'

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

  it('Should return 404 if LoadStores returns null', async () => {
    const { sut, loadStoresSpy } = makeSut()
    loadStoresSpy.result = null
    const response = await sut.handle()
    expect(response).toEqual(notFound())
  })

  it('Should return 500 if LoadStores throws', async () => {
    const { sut, loadStoresSpy } = makeSut()
    jest.spyOn(loadStoresSpy, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })

  it('Should return 200 with stores on success', async () => {
    const { sut, loadStoresSpy } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(loadStoresSpy.result))
  })
})
