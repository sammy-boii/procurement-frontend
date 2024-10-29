import {
  procurementSchema,
  purchaseOrderItemSchema
} from '@/schemas/procurement.schema'
import z from 'zod'

export type TProcurement = z.infer<typeof procurementSchema>
export type TPurchaseOrderItem = z.infer<typeof purchaseOrderItemSchema>
