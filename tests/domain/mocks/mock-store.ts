import faker from '@faker-js/faker'
import { Store } from '@/domain/models'

export const mockStoreParams = () => ({
  name: faker.random.words(),
  owner: faker.random.words()
})

export const mockValidStore = (): Store => ({
  id: faker.datatype.number(),
  storeName: faker.random.words(),
  owner: faker.random.words()
})
