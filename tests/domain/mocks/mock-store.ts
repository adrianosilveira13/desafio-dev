import faker from '@faker-js/faker'

export const mockStoreParams = () => ({
  name: faker.random.words(),
  owner: faker.random.words()
})
