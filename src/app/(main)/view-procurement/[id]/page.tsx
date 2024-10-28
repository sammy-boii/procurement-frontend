import PageHeading from '@/components/elements/PageHeading'
import logo from '/public/assets/herald-logo.png'
import { Truck } from 'lucide-react'
import Image from 'next/image'
import { Children } from 'react'
import { dummyData } from '@/lib/dummyData'
import { cn } from '@/lib/utils'

export default function ViewProcurementPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const data = dummyData[0]

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
          <span>{data.requisitionDate.toLocaleDateString()}</span>
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
              <span>{data.requestor}</span>
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
                {data.supplierVendorInformation?.expectedDate?.toLocaleDateString() ||
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

      <table className='w-full font-light text-sm'>
        <Row>
          <div className='flex flex-col'>
            <span>Requested By</span>
            <div className='w-[70%] space-y-1'>
              <div className='border-b h-16 border-black border-dotted'></div>
              <div>{data.requestor || 'No Name'}</div>
              <div>{data.department || 'No department specified'}</div>
            </div>
          </div>

          <div className='flex flex-col'>
            <span>Verified By</span>
            <div className='w-[70%] space-y-1'>
              <div className='border-b h-16 border-black border-dotted'></div>
              <div>{data.requestor || 'No Name'}</div>
              <div>{data.department || 'No department specified'}</div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span>Approved By</span>
            <div className='w-[70%] space-y-1'>
              <div className='border-b h-16 border-black border-dotted'></div>
              <div>{data.requestor || 'No Name'}</div>
              <div>{data.department || 'No department specified'}</div>
            </div>
          </div>
        </Row>
      </table>
    </main>
  )
}

function Row({
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
            'px-5 py-3 border border-gray-300',
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
