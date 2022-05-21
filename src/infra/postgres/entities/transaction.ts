import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column({ type: 'varchar', nullable: false })
    document: string

  @Column({ type: 'varchar', nullable: false })
    card: string

  @ManyToOne(() => PgStore, (store) => store.transactions)
  @JoinColumn({ name: 'storeId' })
    store: PgStore

  @ManyToOne(() => PgTransactionType, (transactionType) => transactionType.transactions)
  @JoinColumn({ name: 'transactionTypeId' })
    transactionType: PgTransactionType
}
