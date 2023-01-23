import initFunction from 'connect-session-knex'
import session from 'express-session'
import { maxAge } from './constants'
import { knex } from './database'
import { env } from './env'

const StoreFactory = initFunction(session)

export const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge,
    httpOnly: true,
  },
  store: new StoreFactory({
    knex,
    tablename: 'sessions',
  }),
})
