export const persistPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Persist'],
    summary: 'API to persist a file',
    consumes: ['multipart/form-data'],
    parameters: [{
      in: 'formData',
      name: 'upfile',
      type: 'file',
      description: 'The file to upload'
    }],
    responses: {
      204: {
        description: 'Success',
        content: null
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
