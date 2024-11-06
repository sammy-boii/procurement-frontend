import { getProfile, getUserById } from '@/api/actions/user-actions'
import { TUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

interface IRes<T> {
  message: string
  data: T
}

export const useGetProfile = () =>
  useQuery<IRes<TUser>>({
    queryKey: ['profile', 'user'],
    queryFn: () => getProfile()
  })

export const useGetUserById = (id: string) =>
  useQuery<IRes<TUser>>({
    queryKey: ['user'],
    queryFn: () => getUserById(id)
  })
