import { Controller, HttpResponse, ParseCNAB, Validation } from '@/application/protocols'
import { badRequest } from '@/application/helpers'
import { PersistCNAB } from '@/domain/usecases'

export class PersistCNABDataController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly parseCNAB: ParseCNAB,
    private readonly persititCNAB: PersistCNAB
  ) {}

  async handle (request: PersistCNABDataController.HttpRequest): Promise<HttpResponse> {
    const buffer = request.file.buffer
    const error = this.validation.validate(buffer)
    if (error) return badRequest(error)
    const validCNAB = this.parseCNAB.parse(buffer)
    await this.persititCNAB.persist(validCNAB)
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
