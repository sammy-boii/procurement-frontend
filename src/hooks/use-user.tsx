import { getProfile, getUserById } from '@/api/actions/user-actions'
import { TUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

interface IRes<T> {
  message: string
  data: T
}

export const useGetProfile = () =>
  useQuery<IRes<TUser>>({
    queryKey: ['profile'],
    queryFn: () => getProfile()
  })

export const useGetUserById = (id: string | undefined) =>
  useQuery<IRes<TUser>>({
    queryKey: ['user', id],
    queryFn: () => (id ? getUserById(id) : Promise.reject('No ID provided'))
  })
