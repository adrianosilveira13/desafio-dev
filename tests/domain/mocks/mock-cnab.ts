import { CNAB, Transaction } from '@/domain/models'
import faker from '@faker-js/faker'

export const mockCNAB = (): CNAB => ({
  type: faker.datatype.number(),
  date: new Date(),
  amount: faker.datatype.number(),
  document: faker.random.word(),
  card: faker.datatype.uuid(),
  owner: faker.name.findName(),
  storeName: faker.name.findName()
})

export const mockTransaction = (): Transaction => ({
  type: faker.random.word(),
  date: new Date(),
  amount: faker.datatype.number(),
  document: faker.random.word(),
  card: faker.datatype.uuid(),
  owner: faker.name.findName(),
  storeName: faker.name.findName()
})
