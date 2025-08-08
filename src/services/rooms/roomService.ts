import prisma from "../../database/prisma-client";
import { httpError } from "../../utils/httpError";
import { IRoomService } from "./IRoomService";

export class RoomService implements IRoomService {

    async listRooms() {
        return await prisma.room.findMany();
    }

    async createRoom(number:number, type:string, pricePerNight: number, status:string) {
        const existingRoom = await prisma.room.findUnique({where: {number}});


        if (existingRoom) throw new httpError("This user already exists", 409);

        return prisma.room.create({
            data: {
                number,
                type,
                pricePerNight,
                status
            }
        });
    }

    async updateRoom(number:number, type:string, pricePerNight: number, status:string) {
        const room = await prisma.room.findUnique({where: {number}});

        if (!room) throw new httpError("User not found", 404);

        const updateRoom = await prisma.room.update({
            where: {
                number
            },
            data: {
                type,
                pricePerNight,
                status
            }
        });

        return updateRoom;
    }

    async deleteRoom(number: number) {
        const room = await prisma.room.findUnique({where: {number}});

        if (!room) throw new httpError("User not found", 404);

        const deletedRoom = await prisma.room.delete({where: {number}});

        return deletedRoom;
    }
}