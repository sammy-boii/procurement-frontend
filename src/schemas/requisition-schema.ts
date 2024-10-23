import { z } from 'zod'
import { purchaseOrderItemSchema } from './purhcaseOrder-schema'
import { ITEM_STATUS } from '@/constants'

export const supplierVendorInformationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  contactPerson: z.string().optional()
})

export const requisitionSchema = z.object({
  requisitionNo: z.string().min(1, 'Requisition number is required'),
  requisitionDate: z.date(),
  requestor: z.string().min(1, 'Requestor reference is required'),
  requestType: z.string().min(1, 'Request type is required'),
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
      level1: z.enum(ITEM_STATUS).default('PENDING'),
      level2: z.enum(ITEM_STATUS).default('PENDING'),
      finalStatus: z.enum(ITEM_STATUS).default('PENDING')
    })
    .optional()
})
