import { InvalidParamError } from '@/application/errors'
import { CompareFieldsValidation } from '@/validation/validators'

import faker from '@faker-js/faker'

const field = faker.random.word()
const fieldToCompare = faker.random.word()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field'
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
