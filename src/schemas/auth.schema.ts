import { DEPARTMENTS } from '@/constants'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Invalid password' })
})

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    username: z.string().trim().min(1, { message: 'Username is required' }),
    phoneNumber: z.string().trim().min(10, { message: 'Invalid phone number' }),
    name: z.string().trim().min(1, { message: 'Full name is required' }),
    department: z.enum(DEPARTMENTS),
    designation: z
      .string()
      .trim()
      .min(1, { message: 'Designation is required' })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword']
      })
    }
  })
