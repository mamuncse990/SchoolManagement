import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables');
    // Return a mock client in development to prevent crashes
    if (process.env.NODE_ENV === 'development') {
      return new PrismaClient({
        datasources: {
          db: {
            url: 'postgresql://postgres:postgres@localhost:5432/school_management'
          }
        },
        log: ['error']
      });
    }
    throw new Error('DATABASE_URL is not defined in environment variables');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    log: ['query', 'error', 'warn']
  });
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma }