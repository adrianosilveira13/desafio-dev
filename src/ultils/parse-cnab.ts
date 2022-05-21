import { ParseCNAB } from '@/application/protocols'
import { CNAB } from '@/domain/models'

export class ParseCNABTool implements ParseCNAB {
  parse (data: Buffer): CNAB[] {
    const output: CNAB[] = []
    let type: number
    let date: Date
    let amount: number
    let document: string
    let card: string
    let owner: string
    let storeName: string

    const lines = data.toString('utf-8').split('\n')
    for (const line of lines) {
      if (line.length !== 0) {
        const year = line.slice(1, 5)
        const month = line.slice(5, 7)
        const day = line.slice(7, 9)
        const hour = line.slice(42, 44)
        const minutes = line.slice(44, 46)
        const seconds = line.slice(46, 48)
        type = parseInt(line.slice(0, 1))
        date = new Date(`${year}-${month}-${day}T${hour}:${minutes}:${seconds}`)
        amount = parseFloat(line.slice(9, 19)) / 100
        document = line.slice(19, 30)
        card = line.slice(30, 42)
        owner = line.slice(48, 62).toLowerCase().trim()
        storeName = line.slice(62, 81).toLowerCase().trim()
        output.push({
          type,
          date,
          amount,
          document,
          card,
          owner,
          storeName
        })
      }
    }
    return output
  }
}
