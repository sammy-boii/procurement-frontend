import { procurementSchema } from '@/schemas/procurement.schema'
import z from 'zod'

export type TProcurement = z.infer<typeof procurementSchema>
