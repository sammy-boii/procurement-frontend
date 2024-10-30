import PageHeading from '@/components/elements/PageHeading'
import logo from '/public/assets/herald-logo.png'
import { Truck } from 'lucide-react'
import Image from 'next/image'
import { Children } from 'react'
import { cn } from '@/lib/utils'
import { getProcurement } from '@/api/actions/procurement-actions'
import { TProcurement } from '@/types/procurement.types'
import { getProfile, getUserById } from '@/api/actions/user-actions'
import { TUser } from '@/types/user.types'
import VerificationRow from '@/components/elements/VerificationRow'

interface IRes {
  data: TUser
  message: string
}

export default async function ViewProcurementPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const [userRes, procurementRes] = await Promise.all([
    getProfile(),
    getProcurement(id)
  ])

  const profile: TUser = userRes.data
  const data: TProcurement = procurementRes.data

  const approversArr = [
    data.approvedBy?.level1,
    data.approvedBy?.level2
  ].filter((x) => x) as string[]

  // ts cannot auto infer filter()

  const [requestor, ...approvers]: [IRes, ...IRes[]] = await Promise.all([
    getUserById(data.requestor),
    ...approversArr.map((x) => getUserById(x))
  ])

  return (
    <main className='mb-24'>
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

      <section className='mt-12 text-sm font-light'>
        <div className='space-x-4'>
          <span className='text-primary font-semibold'>Requisition Date: </span>
          <span>
            {new Date(data.requisitionDate || '').toLocaleDateString()}
          </span>
        </div>
        <div className='space-x-[30px]'>
          <span className='font-semibold text-primary'>Requisition No: </span>
          <span>{data.requisitionNo}</span>
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
              <span>{requestor.data.name || 'N/A'}</span>
            </div>
            <div className='space-x-2'>
              <span>Name:</span>
              <span>{data.supplierVendorInformation?.name || 'N/A'}</span>
            </div>
          </Row>
          <Row>
            <div className='space-x-2'>
              <span>Department:</span>
              <span>{data.department}</span>
            </div>
            <div className='space-x-2'>
              <span>Address:</span>
              <span>{data.supplierVendorInformation?.address || 'N/A'}</span>
            </div>
          </Row>
          <Row>
            <div className='space-x-2'>
              <span>Expense Type:</span>
              <span>{data.expenseType}</span>
            </div>
            <div className='space-x-2'>
              <span>Phone Number:</span>
              <span>
                {data.supplierVendorInformation?.phoneNumber || 'N/A'}
              </span>
            </div>
          </Row>
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Expected Delivery Date:</span>
              <span>
                {(data.supplierVendorInformation?.expectedDate &&
                  new Date(
                    data.supplierVendorInformation.expectedDate
                  ).toDateString()) ||
                  'N/A'}
              </span>
            </div>
          </Row>
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Reason for the purchase:</span>
              <span>{data.purpose || 'N/A'}</span>
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
          {data.items.map((item, index) => (
            <Row key={item.name}>
              <span>{index}</span>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>Rs. {item.unitPrice}</span>
              <span>Rs. {item.totalPrice}</span>
            </Row>
          ))}
          <Row fullWidth>
            <div className='space-x-2'>
              <span>Total Amout Excluding VAT:</span>
              <span>{data.totalNetPrice}</span>
            </div>
          </Row>
        </tbody>
        <Row divider fullWidth>
          <div>Verification for Approval</div>
        </Row>
      </table>

      <VerificationRow data={data} profile={profile} approvers={approvers} />
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
