import { Controller, HttpResponse, ParseCNAB, Validation } from '@/application/protocols'

export class PersistCNABDataController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly parseCNAB: ParseCNAB
  ) {}

  async handle (request: PersistCNABDataController.HttpRequest): Promise<HttpResponse> {
    const buffer = request.file.buffer
    await this.validation.validate(buffer)
    await this.parseCNAB.parse(buffer)
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
