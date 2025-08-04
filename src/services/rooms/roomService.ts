import { IRoomRepository } from "../../repository/rooms/IRoomRepository";
import { IRoomService } from "./IRoomService";

export class RoomService implements IRoomService {
    private roomRepository: IRoomRepository;

    constructor(roomRepository: IRoomRepository) {
        this.roomRepository = roomRepository;
    }

    async listRooms() {
        return this.roomRepository.listRooms();
    }

    async createRoom(number:number, type:string, pricePerNight: number, status:string) {
        return this.roomRepository.createRoom(number, type, pricePerNight, status);
    }

    async updateRoom(number:number, type:string, pricePerNight: number, status:string) {
        const updatedRoom = await this.roomRepository.updateRoom(number, type, pricePerNight, status);

        if (!updatedRoom) {
            return null;
        }

        return updatedRoom;
    }

    async deleteRoom(number: number) {
        const deletedRoom = await this.roomRepository.deleteRoom(number);

        if (!deletedRoom) {
            return null;
        }

        return deletedRoom;
    }
}