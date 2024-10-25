import { z } from 'zod'
const STATUS = ['PENDING', 'APPROVED', 'REJECTED'] as const

const supplierVendorInformationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  expectedDate: z.date().optional(),
  phoneNumber: z.string().optional()
})

const purchaseOrderItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be a positive number'),
  totalPrice: z.number()
})

const purchaseOrderSchema = z.object({
  poNumber: z.string().min(1, 'PO Number is required'),
  poDate: z.date(),
  supplierVendorInformation: supplierVendorInformationSchema,
  items: z.array(purchaseOrderItemSchema),
  totalNetPrice: z.number(),
  status: z.enum(STATUS).default('PENDING'),
  requisition: z.string().min(1, 'Requisition reference is required'),
  createdBy: z.string().min(1, 'Created by reference is required')
})

export {
  purchaseOrderItemSchema,
  purchaseOrderSchema,
  supplierVendorInformationSchema
}
