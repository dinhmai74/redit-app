import { ApolloError } from 'apollo-server-express'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Post } from '../entities/Post'

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return Post.find()
  }

  @Mutation(() => Post)
  async createPost(@Arg('title') title: string): Promise<Post> {
    return Post.create({ title }).save()
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(@Arg('title') title: string, @Arg('id') id: string): Promise<Post | null> {
    const post = await Post.findOne({ id })
    if (!post) return null

    if (title) {
      post.title = title
      post.save()
    }
    return post
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: string) {
    try {
      const post = await Post.findOne({ id })
      if (!post) return new ApolloError('Not found id', '404')
      await Post.delete(id)
      return true
    } catch (e: any) {
      return new ApolloError(e.message, e?.statusCode || 400)
    }
  }
}
