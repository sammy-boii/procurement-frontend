import { DEPARTMENTS } from '@/constants'
import { z } from 'zod'
const STATUS = ['PENDING', 'APPROVED', 'REJECTED'] as const

const supplierVendorInformationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  expectedDate: z.string().optional(),
  phoneNumber: z.string().optional()
})

export const purchaseOrderItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be a positive number'),
  totalPrice: z.number()
})

export const procurementSchema = z.object({
  requisitionNo: z.string().optional(),
  requisitionDate: z.string().optional(),
  requestor: z.string().min(1, 'Requestor reference is required'),
  department: z.enum(DEPARTMENTS),
  expenseType: z.string().trim().min(1, 'Expense type is required'),
  purpose: z.string().trim().min(1, 'Purpose is required'),
  supplierVendorInformation: supplierVendorInformationSchema.optional(),
  items: z.array(purchaseOrderItemSchema),
  totalNetPrice: z.number(),
  approvedBy: z
    .object({
      level1: z.string().optional(),
      level2: z.string().optional()
    })
    .optional(),
  remarks: z
    .object({
      level1: z.string().optional(),
      level2: z.string().optional()
    })
    .optional(),
  verificationStatus: z
    .object({
      level1: z.enum(STATUS).default('PENDING'),
      level2: z.enum(STATUS).default('PENDING'),
      finalStatus: z.enum(STATUS).default('PENDING')
    })
    .optional()
})
