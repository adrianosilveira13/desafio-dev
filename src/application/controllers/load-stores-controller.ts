import { Controller, HttpResponse } from '@/application/protocols'
import { LoadStores } from '@/domain/usecases'

export class LoadStoresController implements Controller {
  constructor (private readonly loadStores: LoadStores) {}

  async handle (): Promise<HttpResponse> {
    await this.loadStores.load()
    return Promise.resolve(null)
  }
}
