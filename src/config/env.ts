import { z } from "zod";

const envSchema = z.object({
  TURSO_DATABASE: z.string().default('file:local.db'),
  TURSO_TOKEN: z.string(),
  TIME_LOCALE: z.string().default('en-TH'),
})

export const env = envSchema.parse(process.env)
