import { CNAB } from '@/domain/models'

export const mockValidCNAB = (): CNAB[] => [{
  type: 1,
  date: new Date('2019-03-01T15:34:53'),
  amount: 142,
  document: '09620676017',
  card: '4753****3153',
  owner: 'João Macedo',
  storeName: 'Bar Do João'
}, {
  type: 2,
  date: new Date('2019-03-01T14:56:07'),
  amount: 132,
  document: '55641815063',
  card: '3123****7687',
  owner: 'Maria Josefina',
  storeName: 'Loja Do ó - Matriz'
}
]
