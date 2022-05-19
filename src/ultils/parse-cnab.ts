import { ParseCNAB } from '@/application/protocols'
import { CNAB } from '@/domain/models'

export class ParseCNABTool implements ParseCNAB {
  parse (data: Buffer): CNAB[] {
    return null
  }
}
