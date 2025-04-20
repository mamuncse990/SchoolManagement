import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query
  const queryDate = date ? new Date(date as string) : new Date()
  
  try {
    const events = await prisma.event.findMany({
      where: {
        startTime: {
          gte: new Date(queryDate.setHours(0, 0, 0, 0)),
        },
      },
    })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
} 