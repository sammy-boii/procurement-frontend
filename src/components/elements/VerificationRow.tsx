'use client'

import React, { useState } from 'react'
import SignaturePad from './SignaturePad'
import { TUser } from '@/types/user.types'
import { TProcurement } from '@/types/procurement.types'
import { Row } from '@/app/(main)/view-procurement/[id]/page'
import { Button } from '../ui/button'
import { ClipboardPen, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface IRes {
  data: TUser
  message: string
}

const VerificationRow = ({
  profile,
  data,
  approvers
}: {
  data: TProcurement
  profile: TUser
  approvers: IRes[]
}) => {
  const [remark1, setRemark1] = useState(data.remarks?.level1)
  const [remark2, setRemark2] = useState(data.remarks?.level2)

  const [signature1, setSignature1] = useState(data.signature?.level1)
  const [signature2, setSignature2] = useState(data.signature?.level2)

  const [isEditingRemark1, setIsEditingRemark1] = useState(false)
  const [isEditingRemark2, setIsEditingRemark2] = useState(false)

  return (
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

      <Button className='mt-4' size={'lg'}>
        Save
      </Button>
    </table>
  )
}

export default VerificationRow
