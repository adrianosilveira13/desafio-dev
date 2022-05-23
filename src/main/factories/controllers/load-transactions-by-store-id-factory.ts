import { LoadTransactionByStoreController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { makeLoadTransactionByStoreService } from '@/main/factories/services'

export const makeLoadTransactionByStoreController = (): Controller => {
  const controller = new LoadTransactionByStoreController(makeLoadTransactionByStoreService())
  return controller
}
