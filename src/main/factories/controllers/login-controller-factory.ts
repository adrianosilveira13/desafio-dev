/* eslint-disable no-undef */
import { LoginController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { makeAuthenticationService } from '../services'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeAuthenticationService())
  return controller
}
