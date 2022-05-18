import { Hasher } from '@/data/protocols/criptography'
import faker from '@faker-js/faker'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.digest)
  }
}
