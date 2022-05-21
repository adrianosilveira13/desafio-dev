import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn('increment')
    id!: number

  @Column({ type: 'varchar', length: 30 })
    name: string

  @Column({ name: 'email', type: 'varchar', length: '255' })
    email: string

  @Column({ type: 'varchar', length: '300' })
    password: string

  @Column({ type: 'varchar', length: '400', nullable: true })
    accesstoken?: string
}
