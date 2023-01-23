import knexFactory from 'knex'
import { env } from './env'

export const knex = knexFactory({
  client: env.KNEX_CLIENT,
  connection: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_DATABASE,
  },
})
