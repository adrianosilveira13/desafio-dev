import { Controller, HttpResponse } from '@/application/protocols'
import { LoadTransactionByStore } from '@/domain/usecases'

export class LoadTransactionByStoreController implements Controller {
  constructor (private readonly loadTransactionByStore: LoadTransactionByStore) {}

  async handle (request: LoadTransactionByStoreController.Params): Promise<HttpResponse> {
    await this.loadTransactionByStore.loadTransaction(request)
    return Promise.resolve(null)
  }
}

export namespace LoadTransactionByStoreController {
  export type Params = {
    storeId: number
  }
}
