import { PrismaClient } from "@prisma/client"
import { prisma } from "../../prisma/client"

export interface Context {
  prisma : PrismaClient
}

export function createContext(): Context {
  return { prisma }
}