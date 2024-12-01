import { drizzle } from 'drizzle-orm/libsql'
import { env } from '../config/env'
import { table } from './schema'


export const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE,
    authToken: env.TURSO_TOKEN,
  }
})
