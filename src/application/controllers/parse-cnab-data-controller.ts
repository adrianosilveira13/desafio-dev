import { Controller, HttpResponse, ParseCNAB } from '@/application/protocols'

export class PersistCNABDataController implements Controller {
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
