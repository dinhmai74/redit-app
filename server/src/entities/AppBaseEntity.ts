import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Entity, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class AppBaseEntity extends BaseEntity {
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  createAt = new Date()
}
