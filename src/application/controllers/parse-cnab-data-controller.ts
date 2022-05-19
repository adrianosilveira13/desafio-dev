import { Controller, HttpResponse, ParseCNAB, Validation } from '@/application/protocols'
import { badRequest } from '@/application/helpers'

export class PersistCNABDataController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly parseCNAB: ParseCNAB
  ) {}

  async handle (request: PersistCNABDataController.HttpRequest): Promise<HttpResponse> {
    const buffer = request.file.buffer
    const error = await this.validation.validate(buffer)
    if (error) return badRequest(error)
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
