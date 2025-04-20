import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const today = new Date()
  const daysSinceMonday = today.getDay() === 0 ? 6 : today.getDay() - 1
  const lastMonday = new Date(today)
  lastMonday.setDate(today.getDate() - daysSinceMonday)

  try {
    const data = await prisma.attendance.findMany({
      where: {
        date: {
          gte: lastMonday,
        },
      },
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance data' })
  }
} 