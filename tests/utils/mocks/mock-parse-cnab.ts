import { ParseCNAB } from '@/application/protocols'
import { CNAB } from '@/domain/models/cnab'
import { mockCNAB } from '@/tests/domain/mocks'

export class ParseCNABSpy implements ParseCNAB {
  buffer: Buffer
  result = [mockCNAB()]

  parse (data: Buffer): CNAB[] {
    this.buffer = data
    return this.result
  }
}
