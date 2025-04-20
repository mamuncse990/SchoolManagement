import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    })
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' })
  }
} 