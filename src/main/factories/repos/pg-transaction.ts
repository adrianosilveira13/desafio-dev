import { PgTransactionRepository } from '@/infra/postgres/repos'

export const makePgTransactionsRepo = (): PgTransactionRepository => {
  return new PgTransactionRepository()
}
