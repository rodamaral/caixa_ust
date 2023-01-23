import * as dotenv from 'dotenv'
import { cleanEnv, host, port, str } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
  SESSION_SECRET: str(),
  KNEX_CLIENT: str(),
  DATABASE_HOST: host(),
  DATABASE_PORT: port(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_DATABASE: str(),
})
