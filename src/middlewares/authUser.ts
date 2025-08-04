import jwt from 'jsonwebtoken';
import {FastifyRequest, FastifyReply} from 'fastify';
import { User } from '../models/User';

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const headers = req.headers.authorization;

  if (!headers) {
    reply.code(401).send({message: 'Unauthorized'});
    return;
  }

  const token = headers.split(' ')[1];

  const JWT_KEY = process.env.JWT_SECRET

  if(!JWT_KEY) {
    reply.code(500).send({message: 'JWT Secret is not defined'});
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as User;
    req.user = {id: decoded.id, name: decoded.name};
  } catch (error) {
    reply.code(401).send({message: 'Unauthorized'});
  }
};