import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeLoadStoresController } from '@/main/factories'

export default (router: Router): void => {
  router.get('/stores', adaptRoute(makeLoadStoresController()))
}
