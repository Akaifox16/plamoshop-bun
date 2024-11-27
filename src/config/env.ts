import { z } from "zod";

const envSchema = z.object({
  TURSO_DATABASE: z.string().default('file:local.db'),
  TURSO_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
