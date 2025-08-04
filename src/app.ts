import Fastify from 'fastify'
import userRoutes from './routes/users/userRoutes'
import roomRoutes from './routes/rooms/roomRoutes';
import { httpError } from "./utils/httpError"

const app = Fastify();

app.setErrorHandler((error, request, reply) => {
  if (error instanceof httpError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return reply.status(500).send({
    status: "error",
    message: "Internal server error",
  });
});

app.register(userRoutes);
app.register(roomRoutes);

export default app