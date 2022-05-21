import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PgTransaction } from './transaction'

@Entity({ name: 'stores' })
export class PgStore {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column({ type: 'varchar', nullable: false })
    name: string

  @Column({ type: 'varchar', nullable: false })
    owner: string

  @OneToMany(() => PgTransaction, (transaction) => transaction.store)
    transactions: PgTransaction[]
}
