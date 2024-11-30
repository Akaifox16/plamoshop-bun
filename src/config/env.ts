import { z } from "zod";

const envSchema = z.object({
  TURSO_DATABASE: z.string().default('file:local.db'),
  TURSO_TOKEN: z.string(),
  TIME_LOCALE: z.string().default('en-TH'),
  JWT_ACCESS_SECRET: z.string().default('v3ry5ecur3Sec2e7'),
})

export const env = envSchema.parse(process.env)
