import { TransactionType } from '@/domain/models'
import faker from '@faker-js/faker'

export const mockTransactionTypeParams = (): TransactionType => ({
  description: faker.random.words(),
  type: faker.random.word(),
  signal: '+'
})
