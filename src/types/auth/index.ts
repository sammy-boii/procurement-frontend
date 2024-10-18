import { z } from 'zod'
import { loginSchema, signUpSchema } from '@/schemas/auth-schema'

export type TLogin = z.infer<typeof loginSchema>
export type TSignUp = z.infer<typeof signUpSchema>
