import 'reflect-metadata'
require('dotenv').config()
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { HelloResolver } from './resolvers/Hello'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'
import { PostResolver } from './resolvers/Post'

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post],
  })

  const app = express()

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

  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true,
  //       sameSite: 'lax', // csrf
  //       secure: __prod__, // cookie only works in https
  //       domain: __prod__ ? '.codeponder.com' : undefined,
  //     },
  //     saveUninitialized: false,
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //   }),
  // )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: { credentials: true, origin: true } })

  app.get('/', (_req, res) => {
    res.send('Root')
  })

  app.listen(process.env.PORT, () => {
    console.log(`server started on http://localhost:${process.env.PORT}/graphql`)
  })
}

main().catch((err) => {
  console.error(err)
})
