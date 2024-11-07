'use client'

import React, { useState } from 'react'
import SignaturePad from './SignaturePad'
import { TUser } from '@/types/user.types'
import { TProcurement } from '@/types/procurement.types'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'
import {
  useRejectLevel1,
  useRejectLevel2,
  useVerifyLevel1,
  useVerifyLevel2
} from '@/hooks/use-procurement'
import { cn } from '@/lib/utils'
import { Row } from './ViewRow'

interface IRes {
  data: TUser
  message: string
}

const VerificationRow = ({
  profile,
  id,
  data,
  approvers
}: {
  id: string
  data: TProcurement | undefined
  profile: TUser | undefined
  approvers: Array<IRes | undefined>
}) => {
  const [remark1, setRemark1] = useState(data?.remarks?.level1)
  const [remark2, setRemark2] = useState(data?.remarks?.level2)

  const [signature1, setSignature1] = useState(data?.signature?.level1)
  const [signature2, setSignature2] = useState(data?.signature?.level2)

  const [rejectedRemark1, setRejectedRemark1] = useState(
    data?.remarks?.rejectedLevel1
  )
  const [rejectedRemark2, setRejectedRemark2] = useState(
    data?.remarks?.rejectedLevel2
  )

  const { mutate: verifyLevel1 } = useVerifyLevel1()
  const { mutate: verifyLevel2 } = useVerifyLevel2()

  const level1HasChanges =
    remark1 !== data?.remarks?.level1 || signature1 !== data?.signature?.level1

  const level2HasChanges =
    remark2 !== data?.remarks?.level2 || signature2 !== data?.signature?.level2

  function onSubmit() {
    try {
      if (level1HasChanges) {
        verifyLevel1({
          id,
          data: { signature: signature1, remarks: remark1 }
        })
      }
      if (level2HasChanges) {
        verifyLevel2({
          id,
          data: { signature: signature2, remarks: remark2 }
        })
      }
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
    }
  }

  return (
    <>
      <table className='w-full font-light text-sm'>
        <Row>
          <div className='flex flex-col'>
            <span>Verified By</span>
            <div className='w-[70%] space-y-1'>
              <SignaturePad
                signature={signature1}
                setSignature={setSignature1}
                canSign={
                  profile?.role === 'ADMIN' || profile?.role === 'SUPERADMIN'
                }
              />
              <div>
                {(approvers && approvers[0]?.data.name) || 'Not approved'}
              </div>
              <div>{(approvers && approvers[0]?.data.department) || ''}</div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span>Approved By</span>
            <div className='w-[70%] space-y-1'>
              <SignaturePad
                signature={signature2}
                setSignature={setSignature2}
                canSign={profile?.role === 'SUPERADMIN'}
              />
              <div>
                {(approvers && approvers[1]?.data.name) || 'Not approved'}
              </div>
              <div>{(approvers && approvers[1]?.data.department) || ''}</div>
            </div>
          </div>
        </Row>

        <Row>
          <div className='space-x-3 flex items-baseline flex-wrap gap-1'>
            <div className='font-semibold'>Remarks: </div>
            <div className='whitespace-pre-wrap'>
              <input
                placeholder='No remarks'
                className={cn(
                  'focus:outline-none focus:ring-0 border-none',
                  profile &&
                    !['ADMIN', 'SUPERADMIN'].includes(profile?.role) &&
                    'pointer-events-none'
                )}
                value={remark1}
                onChange={(e) => setRemark1(e.target.value)}
              />
            </div>
          </div>

          <div className='space-x-3 flex items-baseline flex-wrap gap-1'>
            <div className='font-semibold'>Remarks: </div>
            <div className='whitespace-pre-wrap'>
              <input
                className={cn(
                  'focus:outline-none focus:ring-0 border-none',
                  profile &&
                    !['SUPERADMIN'].includes(profile?.role) &&
                    'pointer-events-none'
                )}
                placeholder='No remarks'
                value={remark2}
                onChange={(e) => setRemark2(e.target.value)}
              />
            </div>
          </div>
        </Row>
      </table>
      {profile && ['ADMIN', 'SUPERADMIN'].includes(profile.role) && (
        <footer className='flex mt-6 justify-between items-center'>
          <Button
            paginated
            disabled={!(level1HasChanges || level2HasChanges)}
            onClick={onSubmit}
            className='mt-4'
          >
            Approve
            <Check />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button className='mt-4' variant={'destructive'}>
                Reject
                <X />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[150px] text-sm flex flex-col text-center space-y-1 p-2'>
              <RejectDialog
                id={id}
                remarks={rejectedRemark1}
                setRemark={setRejectedRemark1}
                level={'Level 1'}
              />
              {profile.role === 'SUPERADMIN' && (
                <RejectDialog
                  id={id}
                  remarks={rejectedRemark2}
                  setRemark={setRejectedRemark2}
                  level={'Level 2'}
                />
              )}
            </PopoverContent>
          </Popover>
        </footer>
      )}
    </>
  )
}
const RejectDialog = ({
  level,
  remarks,
  id,
  setRemark
}: {
  id: string
  level: 'Level 1' | 'Level 2'
  remarks?: string
  setRemark: any
}) => {
  const { mutate: rejectLevel1 } = useRejectLevel1()
  const { mutate: rejectLevel2 } = useRejectLevel2()
  async function handleReject() {
    try {
      if (level === 'Level 1') {
        rejectLevel1({ id, data: { remarks } })
      } else {
        rejectLevel2({ id, data: { remarks } })
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className='w-full bg-slate-100 hover:bg-destructive hover:text-destructive-foreground p-1 rounded-md cursor-pointer'>
          {level}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className='mb-4'>Enter remarks as per the rejection.</div>

            <Input
              placeholder={`Remark for ${level}`}
              onChange={(e) => setRemark?.(e.target.value)}
              value={remarks}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReject}
            className='bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground'
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default VerificationRow
