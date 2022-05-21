import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PgTransaction } from './transaction'

@Entity({ name: 'stores' })
export class PgStore {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column({ type: 'varchar', length: '40', nullable: false })
    name: string

  @Column({ type: 'varchar', length: '40', nullable: false })
    owner: string

  @OneToMany(type => PgTransaction, store => PgStore)
    transactions: PgTransaction[]
}
