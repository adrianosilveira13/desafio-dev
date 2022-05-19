import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn('increment')
    id!: number

  @Column()
    name: string

  @Column({ name: 'email' })
    email: string

  @Column()
    password: string

  @Column({ nullable: true })
    accesstoken?: string
}
