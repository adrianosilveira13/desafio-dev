import { Controller, HttpResponse } from '@/application/protocols'
import { LoadTransactionByStore } from '@/domain/usecases'
import { notFound, ok, serverError } from '../helpers'

export class LoadTransactionByStoreController implements Controller {
  constructor (private readonly loadTransactionByStore: LoadTransactionByStore) {}

  async handle (request: LoadTransactionByStoreController.Params): Promise<HttpResponse> {
    try {
      const transactions = await this.loadTransactionByStore.loadTransactions(request)
      if (!transactions) return notFound()
      return ok(transactions)
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
