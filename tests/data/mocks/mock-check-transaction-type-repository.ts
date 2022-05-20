import { CheckTransactionTypeRepository } from '../protocols/db/transactions'

export class CheckTransactionTypeRepositorySpy implements CheckTransactionTypeRepository {
  result = true
  types: number[] = []
  callsCount = 0

  async checkByType (type: number): Promise<boolean> {
    this.types.push(type)
    this.callsCount++
    return this.result
  }
}
