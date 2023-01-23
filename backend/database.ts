import knexFactory from 'knex'
import { env } from './env'

export const knex = knexFactory({
  client: env.KNEX_CLIENT,
  connection: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  },
})
