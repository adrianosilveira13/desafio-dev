import { HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbbiden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
