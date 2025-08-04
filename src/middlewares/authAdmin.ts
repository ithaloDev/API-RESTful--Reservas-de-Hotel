import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../database/prisma-client';

export const authAdminMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const headers = req.headers.authorization;

  if (!headers) {
    reply.code(401).send({ message: 'Unauthorized' });
    return;
  }

  const token = headers.split(' ')[1];

  const JWT_KEY = process.env.JWT_SECRET;

  if (!JWT_KEY) {
    reply.code(500).send({ message: 'JWT Secret is not defined' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.role !== 'admin') {
      reply.code(403).send({ message: 'Forbidden' });
      return;
    }

    req.user = { id: user.id, name: user.name};
  } catch (error) {
    reply.code(401).send({ message: 'Unauthorized' });
  }
};