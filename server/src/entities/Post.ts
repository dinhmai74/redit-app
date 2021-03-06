import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AppBaseEntity } from './AppBaseEntity'

@ObjectType()
@Entity()
export class Post extends AppBaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column({ type: 'text' })
  title!: string
}
