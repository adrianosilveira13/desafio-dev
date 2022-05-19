import { ParseCNABSpy } from '@/tests/ultils/mocks'
import { PersistCNABDataController } from '@/application/controllers'

describe('PersistCNABData Controller', () => {
  it('Should call ParseCNAB with correct value', async () => {
    const parseCNABSpy = new ParseCNABSpy()
    const sut = new PersistCNABDataController(parseCNABSpy)
    const request = {
      file: {
        buffer: Buffer.from('any_buffer')
      }
    }
    await sut.handle(request)
    expect(parseCNABSpy.buffer).toBe(request.file.buffer)
  })
})
