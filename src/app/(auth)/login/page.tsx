'use client'

import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { TLogin } from '@/types/auth'
import { loginSchema } from '@/schemas/auth-schema'
import { loginAction } from '@/api/actions/user-actions'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true)

  const router = useRouter()

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: TLogin) {
    try {
      const res = await loginAction(data)
      Cookies.set('acc_token', res.token, { expires: 30 })
      router.replace('/')
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  if (Cookies.get('acc_token')) router.replace('/')

  return (
    <main className='max-w-md grid mt-20 mx-auto'>
      <h1 className='my-4 font-semibold text-4xl tracking-tighter'>Login</h1>
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    required
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                    />
                    <button
                      type='button'
                      className='absolute right-4 top-2.5'
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className='w-full translate-y-2'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Form>
      <p className='text-center text-sm mt-4'>
        Don&apos;t have an account?{' '}
        <Link href='/signup' className='text-primary underline'>
          Sign Up
        </Link>
      </p>
    </main>
  )
}
export default LoginPage
