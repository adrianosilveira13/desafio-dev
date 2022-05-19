import { ParseCNABSpy } from '@/tests/ultils/mocks'
import { PersistCNABDataController } from '@/application/controllers'
import { ValidationSpy } from '@/tests/application/mocks'
import { badRequest } from '@/application/helpers'

const mockRequest = (): PersistCNABDataController.HttpRequest => ({
  file: {
    buffer: Buffer.from('any_buffer')
  }
}
)

type SutTypes = {
  sut: PersistCNABDataController
  validationSpy: ValidationSpy
  parseCNABSpy: ParseCNABSpy
}

const makeSut = (): SutTypes => {
  const parseCNABSpy = new ParseCNABSpy()
  const validationSpy = new ValidationSpy()
  const sut = new PersistCNABDataController(validationSpy, parseCNABSpy)
  return {
    sut,
    validationSpy,
    parseCNABSpy
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
})
