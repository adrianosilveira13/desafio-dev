export interface CheckTransactionTypeRepository {
  checkByType: (type: number) => Promise<CheckTransactionTypeRepository.Result>
}

export namespace CheckTransactionTypeRepository {
  export type Result = boolean
}
