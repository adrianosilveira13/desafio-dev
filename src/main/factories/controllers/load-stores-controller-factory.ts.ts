/* eslint-disable no-undef */
import { LoadStoresController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { makeLoadStoresService } from '../services'

export const makeLoadStoresController = (): Controller => {
  const controller = new LoadStoresController(makeLoadStoresService())
  return controller
}
