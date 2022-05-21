import { ParseCNABTool } from '@/ultils'
import { mockCNABRaw } from '@/tests/utils/mocks'

describe('ParseCNAB Tool', () => {
  it('Should return a valid CNAB object', () => {
    const sut = new ParseCNABTool()
    const validCNAB = sut.parse(Buffer.from(mockCNABRaw()))
    expect(validCNAB).toEqual([{
      type: 1,
      date: new Date('2019-03-01T15:34:53'),
      amount: 142,
      document: '09620676017',
      card: '4753****3153',
      owner: 'joão macedo',
      storeName: 'bar do joão'
    }, {
      type: 2,
      date: new Date('2019-03-01T14:56:07'),
      amount: 132,
      document: '55641815063',
      card: '3123****7687',
      owner: 'maria josefina',
      storeName: 'loja do ó - matriz'
    }
    ])
  })
})
