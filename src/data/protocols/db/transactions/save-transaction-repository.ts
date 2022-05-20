import { CNAB } from '@/domain/models'

export interface SaveTransactionRepository {
  save: (transaction: SaveTransactionRepository.Params) => Promise<SaveTransactionRepository.Result>
}

export namespace SaveTransactionRepository {
  export type Params = CNAB
  export type Result = boolean
}
