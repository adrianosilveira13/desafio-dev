import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeLoadTransactionByStoreController } from '@/main/factories'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/transactions/:storeId', auth, adaptRoute(makeLoadTransactionByStoreController()))
}
