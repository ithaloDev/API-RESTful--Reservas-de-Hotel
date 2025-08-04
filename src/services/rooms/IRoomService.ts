import { Room } from "../../models/Room";

export interface IRoomService {
    listRooms(): Promise<Room[]>; // List all rooms
    createRoom(number:number, type:string, pricePerNight: number, status:string): Promise<Room>; // Create a room
    updateRoom(number:number, type:string, pricePerNight: number, status:string): Promise<Room | null>; // Update a room
    deleteRoom(number: number): Promise<Room | null>; // Delete a room
}