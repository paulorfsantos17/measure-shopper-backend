import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .default('postgresql://docker:docker@localhost:5432/measure?schema=public'),
  PORT: z.coerce.number().default(3333),
  GEMINI_API_KEY: z.string().min(1, 'A chave do API do Gemini é obrigatória.'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', -_env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
