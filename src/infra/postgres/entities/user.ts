import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    name: string

  @Column({ name: 'email' })
    email: string

  @Column()
    password: string

  @Column({ nullable: true })
    accessToken?: string
}
