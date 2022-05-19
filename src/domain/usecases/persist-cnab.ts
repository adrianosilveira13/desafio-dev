import { CNAB } from '@/domain/models'

export interface PersistCNAB {
  persist: (data: PersistCNAB.Params) => Promise<PersistCNAB.Result>
}

export namespace PersistCNAB {
  export type Params = CNAB
  export type Result = boolean
}
