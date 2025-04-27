import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not defined in environment variables');
      // Return a mock client in development to prevent crashes
      if (process.env.NODE_ENV === 'development') {
        console.log('Using development database URL');
        return new PrismaClient({
          datasources: {
            db: {
              url: 'postgresql://postgres:postgres@localhost:5432/school_db'
            }
          },
          log: ['error']
        });
      }
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    console.log('Initializing Prisma client with DATABASE_URL:', process.env.DATABASE_URL);
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      },
      log: ['query', 'error', 'warn']
    });
  } catch (error) {
    console.error('Error initializing Prisma client:', error);
    throw error;
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma }