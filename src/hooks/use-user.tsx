import { getProfile, getUserById } from '@/api/actions/user-actions'
import { TUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = () =>
  useQuery<TUser>({
    queryKey: ['profile', 'user'],
    queryFn: () => getProfile()
  })

export const useGetUserById = (id: string) =>
  useQuery<TUser>({
    queryKey: ['user'],
    queryFn: () => getUserById(id)
  })
