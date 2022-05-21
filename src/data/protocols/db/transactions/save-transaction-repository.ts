import { CNAB } from '@/domain/models'

export interface SaveTransactionRepository {
  save: (transaction: SaveTransactionRepository.Params) => Promise<SaveTransactionRepository.Result>
}

export namespace SaveTransactionRepository {
  export type Params = {
    cnab: CNAB
    storeId: number
  }
  export type Result = boolean
}
