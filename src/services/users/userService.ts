import prisma from "../../database/prisma-client";
import { IUserService } from "../../services/users/IUserService";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { httpError } from "../../utils/httpError";

export class UserService implements IUserService {
  async userView(id: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });

    if (!user) throw new httpError("User not found", 404);

    return user;
  }

  async loginUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new httpError("Email not found", 404);

    const foundUser: User = user;

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) throw new httpError("Incorrect password", 401);

    return user;
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new httpError("This user already exists", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const createdUser: User = newUser;
    return createdUser;
  }

  async deleteUser(requestUserId: string, targetUserId: string): Promise<User> {
    if (requestUserId !== targetUserId) throw new httpError("Forbidden", 403);

    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new httpError("User not found", 404);

    return prisma.user.delete({ where: { id: targetUserId } });
  }

  async updateUser(requestUserId: string, targetUserId: string, name: string, password: string): Promise<User> {
    if (requestUserId !== targetUserId) throw new httpError("Forbidden", 403);

    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new httpError("User not found", 404);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { name, password: hashedPassword },
    });

    return updatedUser;
  }

  async getUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new httpError("User not found", 404);

    return user;
  }
}
