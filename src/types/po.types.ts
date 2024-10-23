import {
  purchaseOrderItemSchema,
  purchaseOrderSchema
} from '@/schemas/purhcaseOrder-schema'
import z from 'zod'

export type IPuchaseOrder = z.infer<typeof purchaseOrderSchema>
export type TPurchaseOrderItem = z.infer<typeof purchaseOrderItemSchema>
