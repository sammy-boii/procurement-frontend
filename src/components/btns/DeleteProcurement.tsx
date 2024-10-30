'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteProcurement } from '@/api/actions/procurement-actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

const DeleteProcurement = ({ id }: { id: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          onClick={() => deleteProcurement(id)}
          variant={'actions'}
          className='text-destructive hover:bg-red-200'
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected procurement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className='text-destructive-foreground hover:text-destructive-foreground hover:bg-red-700 bg-destructive'>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteProcurement
