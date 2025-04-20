import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const teachers = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    })
    res.status(200).json(teachers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' })
  }
} 