import { FastifyInstance } from "fastify";
import { RoomService } from "../../services/rooms/roomService";
import { RoomController } from "../../controllers/rooms/roomController";
import { authAdminMiddleware } from "../../middlewares/authAdmin";

const roomService = new RoomService();
const roomController = new RoomController(roomService);

export default async function roomRoutes(router: FastifyInstance) {
    router.get('/room', roomController.listRooms);
    router.post('/room', { preHandler: authAdminMiddleware }, roomController.createRoom);
    router.put('/room/:id', { preHandler: authAdminMiddleware }, roomController.updateRoom);
    router.delete('/room/:id', { preHandler: authAdminMiddleware }, roomController.deleteRoom);
}