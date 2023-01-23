import * as dotenv from 'dotenv'
import { cleanEnv, host, port, str } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
  SESSION_SECRET: str(),
  KNEX_CLIENT: str(),
  POSTGRES_HOST: host(),
  POSTGRES_PORT: port(),
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),
})
