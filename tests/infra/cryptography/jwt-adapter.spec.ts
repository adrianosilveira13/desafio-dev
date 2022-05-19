import { JwtAdapter } from '@/infra/cryptography'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return Promise.resolve('any_token')
  },

  verify: async (): Promise<string> => {
    return Promise.resolve('any_value')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accesstoken = await sut.encrypt('any_id')
      expect(accesstoken).toBe('any_token')
    })

    it('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
