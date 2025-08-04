import prisma from "../../database/prisma-client";

export class roomRepository {
    async listRooms() {
        return prisma.room.findMany();
    }

    async createRoom(number:number, type:string, pricePerNight: number, status:string) {
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
        return prisma.room.update({
            where: {
                number
            },
            data: {
                type,
                pricePerNight,
                status
            }
        });
    }

    async deleteRoom(number: number) {
        return prisma.room.delete({
            where: {
                number
            }
        });
    }
}