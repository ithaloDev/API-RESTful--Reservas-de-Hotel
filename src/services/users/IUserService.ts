import { User } from "../../models/User";

export interface IUserService {
    userView(id:string): Promise<Omit<User, "password">>;
    createUser(name: string, email: string, password: string): Promise<User>;
    updateUser(requestUserId: string, targetUserId: string, name: string, password: string): Promise<User>;
    deleteUser(requestUserId: string, targetUserId: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    loginUser(email:string, password:string): Promise<User>
}