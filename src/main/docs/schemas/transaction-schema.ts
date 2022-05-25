export const transactionSchema = {
  type: 'object',
  properties: {
    storename: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    amount: {
      type: 'number'
    },
    document: {
      type: 'string'
    },
    card: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    signal: {
      type: 'string'
    }
  },
  required: ['storename', 'date', 'amount', 'document', 'card', 'description', 'type', 'signal']
}
