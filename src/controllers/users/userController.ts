import { FastifyReply, FastifyRequest } from "fastify";
import { IUserService } from "../../services/users/IUserService";
import jwt from "jsonwebtoken";

export class UserController {
  constructor(private userService: IUserService) {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.userView = this.userView.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async userView(req: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.userView(req.user.id);
    return reply.status(200).send(user);
  }

  async loginUser(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string; password: string };
    const user = await this.userService.loginUser(email, password);

    const JWT_KEY = process.env.JWT_SECRET;
    if (!JWT_KEY) throw new Error("JWT Secret is not defined");

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_KEY, { expiresIn: "1h" });

    return reply.status(200).send({
      message: "User logged in successfully",
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async createUser(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    const user = await this.userService.createUser(name, email, password);

    return reply.status(201).send({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  }

  async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { name, password } = req.body as { name: string; password: string };
    const requestUserId = req.user.id;

    const user = await this.userService.updateUser(requestUserId, requestUserId, name, password);

    return reply.status(200).send({
      message: "User updated successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const requestUserId = req.user.id;

    await this.userService.deleteUser(requestUserId, requestUserId);

    return reply.status(200).send({ message: "User deleted successfully" });
  }

  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await this.userService.getUserById(id);

    return reply.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}