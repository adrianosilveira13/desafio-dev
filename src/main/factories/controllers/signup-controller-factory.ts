/* eslint-disable no-undef */
import { SignUpController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { makeAuthenticationService } from '../services'
import { makeAddAccountService } from '../services/add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeAddAccountService(), makeAuthenticationService())
  return controller
}
