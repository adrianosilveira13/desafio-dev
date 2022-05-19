import { ParseCNABSpy } from '@/tests/ultils/mocks'
import { PersistCNABDataController } from '@/application/controllers'

type SutTypes = {
  sut: PersistCNABDataController
  parseCNABSpy: ParseCNABSpy
}

const makeSut = (): SutTypes => {
  const parseCNABSpy = new ParseCNABSpy()
  const sut = new PersistCNABDataController(parseCNABSpy)
  return {
    sut,
    parseCNABSpy
  }
}

describe('PersistCNABData Controller', () => {
  it('Should call ParseCNAB with correct value', async () => {
    const { sut, parseCNABSpy } = makeSut()
    const request = {
      file: {
        buffer: Buffer.from('any_buffer')
      }
    }
    await sut.handle(request)
    expect(parseCNABSpy.buffer).toBe(request.file.buffer)
  })
})
