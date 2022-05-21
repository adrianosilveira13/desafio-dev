import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PgStore } from './store'
import { PgTransactionType } from './transaction_types'

@Entity({ name: 'transaction' })
export class PgTransaction {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column({ type: 'date', nullable: false })
    date: Date

  @Column({ type: 'float', nullable: false })
    amount: number

  @Column({ type: 'varchar', length: '11', nullable: false })
    document: string

  @Column({ type: 'varchar', length: '16', nullable: false })
    card: string

  @ManyToOne(type => PgStore, transactions => PgTransaction)
    store: PgStore

  @ManyToOne(type => PgTransactionType, transaction => PgTransaction)
    transaction_type: PgTransactionType
}
