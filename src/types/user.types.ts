import { TSignUp } from './auth.types'

export type TUser = TSignUp & {
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'
}
