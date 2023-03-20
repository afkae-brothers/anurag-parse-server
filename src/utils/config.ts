import dotenv from 'dotenv'
import { z } from 'zod'

const env = dotenv.config({
  path: '.env',
})

const ZConfig = z.object({
  SERVER_PORT: z.string(),
  DASHBOARD_PORT: z.string(),
  SERVER_HOST: z.string(),
  DATABASE_URI: z.string(),
  APP_ID: z.string(),
  MASTER_KEY: z.string(),
  JAVASCRIPT_KEY: z.string()
})

export const envConfig = ZConfig.parse(env.parsed)
