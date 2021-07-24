import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AppBaseEntity } from './AppBaseEntity'

@ObjectType()
@Entity()
export class User extends AppBaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ type: 'text', unique: true, nullable: true })
  email?: string

  @Column()
  password!: string
}
