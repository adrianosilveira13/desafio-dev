import { PgTransactionType } from '@/infra/postgres/entities'

export interface CheckTransactionTypeRepository {
  checkByType: (type: number) => Promise<CheckTransactionTypeRepository.Result>
}

export namespace CheckTransactionTypeRepository {
  export type Result = PgTransactionType | boolean
}
