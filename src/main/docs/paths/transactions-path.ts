export const transactionsPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Transactions'],
    summary: 'API to get all the Transactions',
    parameters: [{
      in: 'path',
      name: 'storeId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/transactions'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
