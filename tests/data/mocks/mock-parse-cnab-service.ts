import { CNAB } from '@/domain/models'
import { PersistCNAB } from '@/domain/usecases'

export class PersistCNABServiceSpy implements PersistCNAB {
  data: CNAB[]
  result = true

  async persist (data: CNAB[]): Promise<boolean> {
    this.data = data
    return this.result
  }
}
