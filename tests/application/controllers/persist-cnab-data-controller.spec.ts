import { Controller, HttpResponse } from '@/application/protocols'

class PersistCNABDataController implements Controller {
  constructor (private readonly parseCNAB: ParseCNAB) {}

  async handle (request: PersistCNABDataController.HttpRequest): Promise<HttpResponse> {
    await this.parseCNAB.parse(request.file.buffer)
    return Promise.resolve(null)
  }
}

export namespace PersistCNABDataController {
  export type HttpRequest = {
    file: {
      buffer: Buffer
    }
  }
}

interface ParseCNAB {
  parse (data: Buffer): string[]
}

class ParseCNABSpy implements ParseCNAB {
  buffer: Buffer
  result: []

  parse (data: Buffer): string[] {
    this.buffer = data
    return this.result
  }
}

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
