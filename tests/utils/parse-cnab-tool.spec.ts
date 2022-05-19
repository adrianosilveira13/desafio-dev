import { ParseCNABTool } from '@/ultils'
import { mockCNABRaw } from '@/tests/utils/mocks'

describe('ParseCNAB Tool', () => {
  it('Should return a valid CNAB object', () => {
    const sut = new ParseCNABTool()
    sut.parse(Buffer.from(mockCNABRaw()))
  })
})
