import { z } from 'zod'
import { ITEM_STATUS } from '@/constants'

const supplierVendorInformationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  expectedDate: z.date(),
  phoneNumber: z.string().optional()
})

const purchaseOrderItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  units: z.string().min(1, 'Units are required'),
  unitPrice: z.number().min(0, 'Unit price must be a positive number'),
  totalPrice: z.number().min(0, 'Total price must be a positive number')
})

const purchaseOrderSchema = z.object({
  poNumber: z.string().min(1, 'PO Number is required'),
  poDate: z.date(),
  supplierVendorInformation: supplierVendorInformationSchema,
  items: z.array(purchaseOrderItemSchema),
  totalAmount: z.number().min(0, 'Total amount must be a positive number'),
  status: z.enum(ITEM_STATUS).default('PENDING'),
  requisition: z.string().min(1, 'Requisition reference is required'),
  createdBy: z.string().min(1, 'Created by reference is required')
})

export {
  purchaseOrderItemSchema,
  purchaseOrderSchema,
  supplierVendorInformationSchema
}
