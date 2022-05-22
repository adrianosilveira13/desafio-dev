import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeLoadStoresController } from '@/main/factories'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/stores', auth, adaptRoute(makeLoadStoresController()))
}
