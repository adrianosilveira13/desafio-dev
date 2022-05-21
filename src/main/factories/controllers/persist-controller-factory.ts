import { PersistCNABDataController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { ParseCNABTool } from '@/ultils'
import { makePersistCNABService } from '@/main/factories/services'
import { makePersistValidation } from './persist-validation-factory'

export const makePersistController = (): Controller => {
  const controller = new PersistCNABDataController(makePersistValidation(), new ParseCNABTool(), makePersistCNABService())
  return controller
}
