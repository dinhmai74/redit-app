import { ApolloError } from 'apollo-server-express'
import argon from 'argon2'
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { errorNames } from '../constants/ErrorCode'
import { User } from '../entities/User'
import { logger } from '../utils/winston'

@InputType()
class UserPasswordInput {
  @Field()
  username: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    return User.find()
  }

  @Mutation(() => User)
  async register(@Arg('input') input: UserPasswordInput): Promise<User> {
    const passwordHash = await argon.hash(input.password)
    logger.debug({
      label: 'passwordHash',
      message: passwordHash,
    })
    const user = await User.create({
      username: input.username,
      password: passwordHash,
    })

    return await user.save()
  }

  @Mutation(() => User)
  async login(@Arg('input') input: UserPasswordInput) {
    const user = await User.findOne({ username: input.username })

    if (!user) throw new ApolloError(errorNames.USER_NOT_FOUND)

    if (await argon.verify(user.password, input.password)) {
      return user
    } else throw new ApolloError(errorNames.INVALID_PASSWORD)
  }
}
