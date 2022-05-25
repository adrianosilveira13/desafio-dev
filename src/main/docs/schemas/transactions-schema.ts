export const transactionsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/transaction'
  }
}
