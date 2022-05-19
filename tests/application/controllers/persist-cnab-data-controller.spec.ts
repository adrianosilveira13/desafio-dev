import { ParseCNABSpy } from '@/tests/ultils/mocks'
import { PersistCNABDataController } from '@/application/controllers'
import { ValidationSpy } from '@/tests/application/mocks'
import { badRequest } from '@/application/helpers'
import { mockCNAB } from '@/tests/domain/mocks'
import { PersistCNABServiceSpy } from '@/tests/data/mocks'

const mockRequest = (): PersistCNABDataController.HttpRequest => ({
  file: {
    buffer: Buffer.from('any_buffer')
  }
}
)

type SutTypes = {
  sut: PersistCNABDataController
  validationSpy: ValidationSpy
  parseCNABSpy: ParseCNABSpy,
  persistCNABServiceSpy: PersistCNABServiceSpy
}

const makeSut = (): SutTypes => {
  const parseCNABSpy = new ParseCNABSpy()
  const validationSpy = new ValidationSpy()
  const persistCNABServiceSpy = new PersistCNABServiceSpy()
  const sut = new PersistCNABDataController(validationSpy, parseCNABSpy, persistCNABServiceSpy)
  return {
    sut,
    validationSpy,
    parseCNABSpy,
    persistCNABServiceSpy
  }
}

describe('PersistCNABData Controller', () => {
  it('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toBe(request.file.buffer)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  it('Should call ParseCNAB with correct value', async () => {
    const { sut, parseCNABSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(parseCNABSpy.buffer).toBe(request.file.buffer)
  })

  it('Should call PersistCNABService with correct value', async () => {
    const { sut, parseCNABSpy, persistCNABServiceSpy } = makeSut()
    parseCNABSpy.result = mockCNAB()
    await sut.handle(mockRequest())
    expect(persistCNABServiceSpy.data).toEqual(parseCNABSpy.result)
  })
})
