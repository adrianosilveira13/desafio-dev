import { Validation } from '@/application/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makePersistValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['file']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
