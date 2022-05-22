import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PgStore } from './store'
import { PgTransactionType } from './transaction_types'

@Entity({ name: 'transaction' })
export class PgTransaction {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column({ type: 'timestamptz', nullable: false })
    date: Date

  @Column({ type: 'float', nullable: false })
    amount: number

  @Column({ type: 'varchar', nullable: false })
    document: string

  @Column({ type: 'varchar', nullable: false })
    card: string

  @ManyToOne(() => PgStore, (store) => store.transactions)
  @JoinColumn({ name: 'store_id' })
  public store: PgStore

  @Column()
  public store_id: number

  @ManyToOne(() => PgTransactionType, (transactionType) => transactionType.transactions)
  @JoinColumn({ name: 'transaction_type_id' })
  public transactionType: PgTransactionType

  @Column()
  public transaction_type_id: number
}
