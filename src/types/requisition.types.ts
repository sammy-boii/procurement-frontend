import { requisitionSchema } from '@/schemas/requisition-schema'
import z from 'zod'

export type TRequisition = z.infer<typeof requisitionSchema>
