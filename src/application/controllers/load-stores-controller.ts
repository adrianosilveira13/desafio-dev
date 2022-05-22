import { Controller, HttpResponse } from '@/application/protocols'
import { LoadStores } from '@/domain/usecases'
import { notFound, ok } from '@/application/helpers'

export class LoadStoresController implements Controller {
  constructor (private readonly loadStores: LoadStores) {}

  async handle (): Promise<HttpResponse> {
    const stores = await this.loadStores.load()
    if (stores === null) return notFound()
    return ok(stores)
  }
}
