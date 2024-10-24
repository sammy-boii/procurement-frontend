import { z } from 'zod'
import {
  purchaseOrderItemSchema,
  supplierVendorInformationSchema
} from './purchaseOrder.schema'

const STATUS = ['PENDING', 'APPROVED', 'REJECTED'] as const

const procurementSchema = z.object({
  requisitionNo: z.string().min(1, 'Requisition number is required'),
  requisitionDate: z.date(),
  requestor: z.string().min(1, 'Requestor reference is required'),
  // requestType: z.string().min(1, 'Request type is required'),
  department: z.string().min(1, 'Department is required'),
  expenseType: z.string().min(1, 'Expense type is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  supplierVendorInformation: supplierVendorInformationSchema.optional(),
  items: z.array(purchaseOrderItemSchema),
  approvedBy: z
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

export { procurementSchema }
