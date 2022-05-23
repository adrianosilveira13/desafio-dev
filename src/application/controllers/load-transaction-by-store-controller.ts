import { Controller, HttpResponse } from '@/application/protocols'
import { LoadTransactionByStore } from '@/domain/usecases'
import { notFound, ok, serverError } from '../helpers'

export class LoadTransactionByStoreController implements Controller {
  constructor (private readonly loadTransactionByStore: LoadTransactionByStore) {}

  async handle (request: LoadTransactionByStoreController.Params): Promise<HttpResponse> {
    try {
      const transaction = await this.loadTransactionByStore.loadTransaction(request)
      if (!transaction) return notFound()
      return ok(transaction)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadTransactionByStoreController {
  export type Params = {
    storeId: number
  }
}
