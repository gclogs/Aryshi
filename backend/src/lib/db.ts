import { Prisma, PrismaClient } from '@prisma/client'
import date from './date'

const db = new PrismaClient()

export default db