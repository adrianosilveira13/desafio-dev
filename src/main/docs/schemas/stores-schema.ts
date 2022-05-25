export const storesSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    storeName: {
      type: 'string'
    },
    owner: {
      type: 'string'
    }
  },
  required: ['id', 'storeName', 'owner']
}
