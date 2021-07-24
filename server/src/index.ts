import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
import { ApolloError, ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { HelloResolver } from './resolvers/Hello'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'
import { logger, morganMiddleware } from './utils/winston'
import { getErrorCode } from './utils/getError'
import { errorNames } from './constants/ErrorCode'

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post, User],
  })

  const app = express()
  app.use(morganMiddleware)

  // const RedisStore = connectRedisya(session)
  // const redis = new Redis(process.env.REDIS_URL)
  app.set('trust proxy', 1)
  const corsOption = {
    origin: '*',
    credentials: true,
  }

  app.use(cors(corsOption))
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )
  app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, authorization',
    )
    res.header('Access-Control-Allow-Credentials, true')
    res.header('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    formatError: (err: any) => {
      const error = err as ApolloError
      const returnError = getErrorCode(err.message)

      if (returnError) {
        logger.error({
          label: `Error ${returnError.statusCode}`,
          message: returnError?.logMessage || returnError?.message,
        })
        return {
          message: returnError?.logMessage || returnError?.message || errorNames.SERVER_ERROR,
          statusCode: returnError?.statusCode || 500,
        }
      } else
        logger.error({
          label: `Error ${error?.extensions?.code}`,
          message: JSON.stringify(error),
        })

      return { ...error, statusCode: error?.extensions?.code }
    },
  })

  apolloServer.applyMiddleware({ app, cors: { credentials: true, origin: true } })

  app.get('/', (_req, res) => {
    res.send('Root')
  })

  app.listen(process.env.PORT, () => {
    logger.http({
      label: 'Server started on',
      message: `http://localhost:${process.env.PORT}/graphql`,
    })
  })
}

main().catch((err) => {
  logger.error(err.toString())
})
