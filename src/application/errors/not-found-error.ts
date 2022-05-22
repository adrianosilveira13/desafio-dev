export class NotFoundError extends Error {
  constructor () {
    super('Found no data')
    this.name = 'NotFoundError'
  }
}
