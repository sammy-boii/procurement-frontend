'use client'

import React, { useState } from 'react'
import SignaturePad from './SignaturePad'
import { TUser } from '@/types/user.types'
import { TProcurement } from '@/types/procurement.types'
import { Row } from '@/app/(main)/view-procurement/[id]/page'
import { Button } from '../ui/button'
import { Check, ClipboardPen, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  verifyLevel1,
  verifyLevel2,
  rejectLevel1,
  rejectLevel2
} from '@/api/actions/procurement-actions'
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
  data: TProcurement
  profile: TUser
  approvers: IRes[]
}) => {
  const [remark1, setRemark1] = useState(data.remarks?.level1)
  const [remark2, setRemark2] = useState(data.remarks?.level2)

  const [signature1, setSignature1] = useState(data.signature?.level1)
  const [signature2, setSignature2] = useState(data.signature?.level2)

  const [rejectedRemark1, setRejectedRemark1] = useState(
    data.remarks?.rejectedLevel1
  )
  const [rejectedRemark2, setRejectedRemark2] = useState(
    data.remarks?.rejectedLevel2
  )

  const [isEditingRemark1, setIsEditingRemark1] = useState(false)
  const [isEditingRemark2, setIsEditingRemark2] = useState(false)

  const level1HasChanges =
    (isEditingRemark1 && remark1 !== data.remarks?.level1) ||
    signature1 !== data.signature?.level1

  const level2HasChanges =
    (isEditingRemark2 && remark2 !== data.remarks?.level2) ||
    signature2 !== data.signature?.level2

  async function onSubmit() {
    try {
      toast.loading('Updating procurement')
      if (level1HasChanges) {
        await verifyLevel1(id, { signature: signature1, remarks: remark1 })
      }
      if (level2HasChanges) {
        await verifyLevel2(id, { signature: signature2, remarks: remark2 })
      }
      toast.dismiss()
      toast.success('Procurement updated successfully')
    } catch (err) {
      toast.dismiss()
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
                  profile.role === 'ADMIN' || profile.role === 'SUPERADMIN'
                }
              />
              <div>{approvers[0]?.data.name || 'Not approved'}</div>
              <div>{approvers[0]?.data.department || ''}</div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span>Approved By</span>
            <div className='w-[70%] space-y-1'>
              <SignaturePad
                signature={signature2}
                setSignature={setSignature2}
                canSign={profile.role === 'SUPERADMIN'}
              />
              <div>{approvers[1]?.data.name || 'Not approved'}</div>
              <div>{approvers[1]?.data.department || ''}</div>
            </div>
          </div>
        </Row>

        <Row>
          <div className='space-x-3 flex items-baseline flex-wrap gap-1'>
            <div className='font-semibold'>Remarks: </div>
            <div className='whitespace-pre-wrap'>
              {isEditingRemark1 ? (
                <input
                  placeholder='No remarks'
                  className='focus:outline-none focus:ring-0 border-none'
                  value={remark1}
                  onChange={(e) => setRemark1(e.target.value)}
                />
              ) : (
                <span>{remark1 || 'No remarks'}</span>
              )}
              {['ADMIN', 'SUPERADMIN'].includes(profile.role) && (
                <button
                  onClick={() => setIsEditingRemark1(!isEditingRemark1)}
                  className='ml-4'
                >
                  {isEditingRemark1 ? (
                    <div className='flex items-center gap-1'>
                      <Button size={'sm'}>
                        <Save size={16} />
                        <span>Save</span>
                      </Button>
                    </div>
                  ) : (
                    <Button size={'sm'}>
                      <ClipboardPen size={16} />
                      <span>Edit</span>
                    </Button>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className='space-x-3 flex items-baseline flex-wrap gap-1'>
            <div className='font-semibold'>Remarks: </div>
            <div className='whitespace-pre-wrap'>
              {isEditingRemark2 ? (
                <input
                  className='focus:outline-none focus:ring-0 border-none'
                  placeholder='No remarks'
                  value={remark2}
                  onChange={(e) => setRemark2(e.target.value)}
                />
              ) : (
                <span>{remark2 || 'No remarks'}</span>
              )}
              {profile.role === 'SUPERADMIN' && (
                <button
                  onClick={() => setIsEditingRemark2(!isEditingRemark2)}
                  className='ml-4'
                >
                  {isEditingRemark2 ? (
                    <div className='flex items-center gap-1'>
                      <Button size={'sm'}>
                        <Save size={16} />
                        <span>Save</span>
                      </Button>
                    </div>
                  ) : (
                    <Button size={'sm'}>
                      <ClipboardPen size={16} />
                      <span>Edit</span>
                    </Button>
                  )}
                </button>
              )}
            </div>
          </div>
        </Row>
      </table>
      {['ADMIN', 'SUPERADMIN'].includes(profile.role) && (
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
              <RejectDialog
                id={id}
                remarks={rejectedRemark2}
                setRemark={setRejectedRemark2}
                level={'Level 2'}
              />
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
  async function handleReject() {
    try {
      if (level === 'Level 1') {
        await rejectLevel1(id, { remarks })
      } else {
        await rejectLevel2(id, { remarks })
      }
      toast.success('Procurement updated successfully')
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className='w-full hover:bg-destructive hover:text-destructive-foreground p-1 rounded-md cursor-pointer'>
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
