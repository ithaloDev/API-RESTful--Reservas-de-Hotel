import { FastifyRequest, FastifyReply } from "fastify";
import { IRoomService } from "../../services/rooms/IRoomService";
import { Room } from "../../models/Room";

export class RoomController {
    private roomService: IRoomService;

    constructor(roomService: IRoomService) {
        this.roomService = roomService;
        this.createRoom = this.createRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.listRooms = this.listRooms.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
    }

    async listRooms(_req: FastifyRequest, reply: FastifyReply) {
        const rooms = await this.roomService.listRooms();
        reply.status(200).send(rooms);
    }

    async createRoom(req: FastifyRequest, reply: FastifyReply) {
        const { number, type, pricePerNight, status } = req.body as Room;

        const room = await this.roomService.createRoom(number, type, pricePerNight, status);

        return reply.status(201).send({
            message: "Room created sucessfully",
            room: { number: room.number, type: room.type, pricePerNight: room.pricePerNight, status: room.status }
        });
    }

    async updateRoom(req: FastifyRequest, reply: FastifyReply) {
        const { type, pricePerNight, status } = req.body as Room;
        const { number } = req.params as {number: number};

        const room = await this.roomService.updateRoom(number, type, pricePerNight, status);

        return reply.status(200).send({
            message: "Room updated sucessfully",
            room: { number: room.number, type: room.type, pricePerNight: room.pricePerNight, status: room.status }
        });
    }

    async deleteRoom(req: FastifyRequest, reply: FastifyReply) {
        const { number } = req.params as Room;

        await this.roomService.deleteRoom(number);
        
        return reply.status(200).send({message: "Room deleted sucessfully"});
    }
}