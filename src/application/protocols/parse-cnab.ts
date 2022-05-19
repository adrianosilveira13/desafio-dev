import { CNAB } from '@/domain/models/cnab'

export interface ParseCNAB {
  parse (data: Buffer): CNAB
}
