export const storesPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Stores'],
    summary: 'API to get all the stores',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stores'
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
