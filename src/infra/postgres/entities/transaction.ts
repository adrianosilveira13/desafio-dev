import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PgStore } from './store'
import { PgTransactionTypes } from './transaction_types'

@Entity({ name: 'transactions' })
export class PgTransactions {
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

  @ManyToOne(type => PgStore, transactions => PgTransactions)
    store: PgStore

  @ManyToOne(type => PgTransactionTypes, transaction => PgTransactions)
    transaction_type: PgTransactionTypes
}
