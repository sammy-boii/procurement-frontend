'use client'

import PageHeading from '@/components/elements/PageHeading'
import logo from '/public/assets/herald-logo.png'
import { Truck } from 'lucide-react'
import Image from 'next/image'
import { Children } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { TUser } from '@/types/user.types'
import VerificationRow from '@/components/elements/VerificationRow'
import { ITEM_STATUS } from '@/constants'
import { useGetProfile, useGetUserById } from '@/hooks/use-user'
import { useGetProcurementById } from '@/hooks/use-procurement'
import GiantSpinner from '@/components/elements/GiantSpinner'

interface IRes {
  data: TUser
  message: string
}

export default function ViewProcurementPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const { data: profile, isPending: isProfilePending } = useGetProfile()
  const { data, isPending: isProcurementPending } = useGetProcurementById(id)

  // ts cannot auto infer filter()

  const { data: requestor, isPending: isRequestorPending } = useGetUserById(
    data?.data.requestor
  )
  const { data: approver1, isPending: isApprover1Pending } = useGetUserById(
    data?.data.approvedBy?.level1
  )
  const { data: approver2, isPending: isApprover2Pending } = useGetUserById(
    data?.data.approvedBy?.level2
  )

  console.log(data?.data.approvedBy?.level2, 'LELVE@')

  if (
    isProfilePending ||
    isRequestorPending ||
    isApprover1Pending ||
    isApprover2Pending ||
    isProcurementPending
  )
    return <GiantSpinner />

  const approvers = [approver1, approver2]

  console.log(approvers)
  return (
    <main className='mb-10'>
      <header>
        <PageHeading
          title='Procurement'
          description='Request for, and view all procurements'
          logo={Truck}
        />
        <div className='flex mt-20 items-baseline justify-between'>
          <h2 className='text-xl font-semibold'>Procurement Requisit Detail</h2>
          <Image width={200} src={logo} alt='logo' />
        </div>
      </header>

      <div className='flex mt-3 items-center justify-between'>
        <section className='mt-12 text-sm font-light'>
          <div className='space-x-4'>
            <span className='text-primary font-semibold'>
              Requisition Date:{' '}
            </span>
            <span>
              {new Date(data?.data.requisitionDate || '').toLocaleDateString()}
            </span>
          </div>
          <div className='space-x-[30px]'>
            <span className='font-semibold text-primary'>Requisition No: </span>
            <span>{data?.data.requisitionNo || 'N/A'}</span>
          </div>
        </section>
      </div>

      <section className='text-sm flex mt-12 items-baseline justify-between'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='text-primary font-semibold'>Level 1:</span>
            <div
              className='px-2 py-1 rounded-md'
              style={{
                background:
                  ITEM_STATUS[
                    data?.data.verificationStatus?.level1 || 'PENDING'
                  ].bgColor,
                color:
                  ITEM_STATUS[
                    data?.data.verificationStatus?.level1 || 'PENDING'
                  ].color
              }}
            >
              {data?.data.verificationStatus?.level1}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-primary font-semibold'>Level 2:</span>
            <div
              className='px-2 py-1 rounded-md'
              style={{
                background:
                  ITEM_STATUS[
                    data?.data.verificationStatus?.level2 || 'PENDING'
                  ].bgColor,
                color:
                  ITEM_STATUS[
                    data?.data.verificationStatus?.level2 || 'PENDING'
                  ].color
              }}
            >
              {data?.data.verificationStatus?.level2}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-primary font-semibold'>Final Status:</span>
          <div
            className='px-2 py-1 rounded-md'
            style={{
              background:
                ITEM_STATUS[
                  data?.data.verificationStatus?.finalStatus || 'PENDING'
                ].bgColor,
              color:
                ITEM_STATUS[
                  data?.data.verificationStatus?.finalStatus || 'PENDING'
                ].color
            }}
          >
            {data?.data.verificationStatus?.finalStatus}
          </div>
        </div>
      </section>

      <table className='mt-12 font-light text-sm w-full'>
        <thead>
          <Row heading>
            <span>Requestor Information</span>
            <span>Vendor / Supplier Information</span>
          </Row>
        </thead>

        <tbody>
          <Row>
            <div className='space-x-2'>
              <span>Name:</span>
              <span>{requestor?.data.name || 'N/A'}</span>
            </div>
            <div className='space-x-2'>
              <span>Name:</span>
              <span>{data?.data.supplierVendorInformation?.name || 'N/A'}</span>
            </div>
          </Row>
          <Row>
            <div className='space-x-2'>
              <span>Department:</span>
              <span>{data?.data.department}</span>
            </div>
            <div className='space-x-2'>
              <span>Address:</span>
              <span>
                {data?.data.supplierVendorInformation?.address || 'N/A'}
              </span>
            </div>
          </Row>
          <Row>
            <div className='space-x-2'>
              <span>Expense Type:</span>
              <span>{data?.data.expenseType}</span>
            </div>
            <div className='space-x-2'>
              <span>Phone Number:</span>
              <span>
                {data?.data.supplierVendorInformation?.phoneNumber || 'N/A'}
              </span>
            </div>
          </Row>
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Expected Delivery Date:</span>
              <span>
                {(data?.data.supplierVendorInformation?.expectedDate &&
                  new Date(
                    data?.data.supplierVendorInformation.expectedDate
                  ).toDateString()) ||
                  'N/A'}
              </span>
            </div>
          </Row>
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Reason for the purchase:</span>
              <span>{data?.data.purpose || 'N/A'}</span>
            </div>
          </Row>
          <Row divider fullWidth>
            <td colSpan={2} className='h-12'></td>
          </Row>
        </tbody>
      </table>

      <table className='w-full font-light text-sm'>
        <thead>
          <Row fullWidth>
            <div>
              Required Goods Information (To be Filled by the Requestor)
            </div>
          </Row>
          <Row heading>
            <span>S.N.</span>
            <span>Product Name</span>
            <span>Quantity</span>
            <span>Unit</span>
            <span>Total</span>
          </Row>
        </thead>

        <tbody>
          {data?.data.items.map((item, index) => (
            <Row key={item.name}>
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>Rs. {formatCurrency(item.unitPrice)}</span>
              <span>Rs. {formatCurrency(item.totalPrice)}</span>
            </Row>
          ))}
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Total Amout Excluding VAT:</span>
              <span>Rs. {formatCurrency(data?.data.totalNetPrice || 0)}</span>
            </div>
          </Row>
        </tbody>
        <Row divider fullWidth>
          <div>Verification for Approval</div>
        </Row>
      </table>

      <VerificationRow
        id={id}
        data={data?.data}
        profile={profile?.data}
        approvers={approvers}
      />
    </main>
  )
}

export function Row({
  children,
  heading = false,
  divider = false,
  fullWidth = false
}: {
  children: React.ReactNode
  divider?: boolean
  heading?: boolean
  fullWidth?: boolean
}) {
  return heading ? (
    <tr>
      {Children.map(children, (child) => (
        <th
          colSpan={fullWidth ? 5 : 1}
          className='font-medium text-left px-5 py-3 border border-gray-300'
        >
          {child}
        </th>
      ))}
    </tr>
  ) : divider ? (
    <tr>
      <td
        colSpan={fullWidth ? 5 : 1}
        className={cn(
          'px-5 py-3 border border-gray-300 border-b-0',
          fullWidth && 'w-full'
        )}
      >
        {children}
      </td>
    </tr>
  ) : (
    <tr>
      {Children.map(children, (child, index) => (
        <td
          colSpan={fullWidth ? 5 : 1}
          className={cn(
            'px-5 max-w-[300px] whitespace-normal break-words py-3 border border-gray-300',
            fullWidth && 'w-full'
          )}
          key={index}
        >
          {child}
        </td>
      ))}
    </tr>
  )
}
