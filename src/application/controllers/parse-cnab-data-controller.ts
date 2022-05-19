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
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const validCNAB = this.parseCNAB.parse(request.file.buffer)
      const success = await this.persititCNAB.persist(validCNAB)
      if (!success) return serverError(new Error())
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
