import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Invalid password' })
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  username: z.string()
})
