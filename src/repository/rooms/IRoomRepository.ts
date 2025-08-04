import { Room } from "../../models/Room";

export interface IRoomRepository {
    listRooms(): Promise<Room[]>;
    createRoom(number:number, type:string, pricePerNight: number, status:string): Promise<Room>;
    updateRoom(number:number, type:string, pricePerNight: number, status:string): Promise<Room | null>;
    deleteRoom(number: number): Promise<Room | null>;
}