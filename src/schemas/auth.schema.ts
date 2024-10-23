import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Invalid password' })
})

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Invalid password' }),
    confirmPassword: z.string(),
    username: z.string().min(1, { message: 'Username is required' }),
    phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
    name: z.string().min(1, { message: 'Full name is required' }),
    department: z.string().min(1, { message: 'Department is required' }),
    designation: z.string().min(1, { message: 'Designation is required' })
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
