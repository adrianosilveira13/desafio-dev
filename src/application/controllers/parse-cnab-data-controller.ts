import { Controller, HttpResponse, ParseCNAB, Validation } from '@/application/protocols'
import { badRequest, noContent, serverError } from '@/application/helpers'
import { PersistCNAB } from '@/domain/usecases'

export class PersistCNABDataController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly parseCNAB: ParseCNAB,
    private readonly persititCNAB: PersistCNAB
  ) {}

  async handle (request: PersistCNABDataController.HttpRequest): Promise<HttpResponse> {
    try {
      const buffer = request.file.buffer
      const error = this.validation.validate(buffer)
      if (error) return badRequest(error)
      const validCNAB = this.parseCNAB.parse(buffer)
      await this.persititCNAB.persist(validCNAB)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace PersistCNABDataController {
  export type HttpRequest = {
    file: {
      buffer: Buffer
    }
  }
}
