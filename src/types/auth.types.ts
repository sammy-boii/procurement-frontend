import { z } from 'zod'
import { loginSchema, registerSchema } from '@/schemas/auth.schema'

export type TLogin = z.infer<typeof loginSchema>
export type TSignUp = z.infer<typeof registerSchema>
