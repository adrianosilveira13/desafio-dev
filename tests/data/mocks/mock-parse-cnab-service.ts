import { CNAB } from '@/domain/models'
import { PersistCNAB } from '@/domain/usecases'

export class PersistCNABServiceSpy implements PersistCNAB {
  data: CNAB

  async persist (data: CNAB): Promise<boolean> {
    this.data = data
    return Promise.resolve(null)
  }
}
