import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { table, id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        if (typeof table !== 'string' || !(table in prisma)) {
          return res.status(400).json({ message: 'Invalid table name' });
        }
        const item = await (prisma as any)[table].findUnique({
          where: { id: id as string },
        });
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
        break;

      case 'PUT':
        if (typeof table !== 'string' || !(table in prisma)) {
          return res.status(400).json({ message: 'Invalid table name' });
        }
        const updatedItem = await (prisma as any)[table].update({
          where: { id: id as string },
          data: req.body,
        });
        res.json(updatedItem);
        break;

      case 'DELETE':
        if (typeof table !== 'string' || !(table in prisma)) {
          return res.status(400).json({ message: 'Invalid table name' });
        }
        await (prisma as any)[table].delete({
          where: { id: id as string },
        });
        res.status(204).end();
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
