import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { table } = req.query;

  if (typeof table !== 'string' || !(table in prisma)) {
    res.status(400).json({ message: 'Invalid table name' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const items = await (prisma as any)[table].findMany({
          orderBy: { createdAt: 'desc' },
        });
        res.json(items);
        break;

      case 'POST':
        const newItem = await (prisma as any)[table].create({
          data: req.body,
        });
        res.json(newItem);
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
