import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from './prisma';

export async function getAuthUser() {
  const token = cookies().get('token')?.value;
  let role = 'user';
  let userId = '';
  
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as { roleId: string; userId: string };
      const userRole = await prisma.role.findUnique({
        where: { id: parseInt(decoded.roleId) },
        select: { name: true }
      });
      role = userRole?.name || 'user';
      userId = decoded.userId;
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return { role, userId };
} 