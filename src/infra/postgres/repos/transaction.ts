import { CheckTransactionTypeRepository } from '@/data/protocols/db'
import { getRepository } from 'typeorm'
import { PgTransactionType } from '../entities'

export class PgTransactionRepository implements CheckTransactionTypeRepository {
  async checkByType (type: number): Promise<boolean> {
    const transactionTypeRepo = getRepository(PgTransactionType)
    const transactionType = await transactionTypeRepo.findOne({ id: type })
    if (!transactionType) return false
    return true
  }
}
