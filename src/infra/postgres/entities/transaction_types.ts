/* eslint-disable camelcase */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PgTransactions } from './transaction'

@Entity({ name: 'transaction_types' })
export class PgTransactionTypes {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column({ type: 'varchar', length: '30', nullable: false, unique: true })
    description: string

  @Column({ type: 'varchar', length: '20', nullable: false })
    type: string

  @Column({ type: 'char', length: '1', nullable: false })
    signal: string

  @OneToMany(type => PgTransactions, transaction_type => PgTransactionTypes)
    transaction: PgTransactions[]
}
