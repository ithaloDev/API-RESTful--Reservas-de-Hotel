import {FastifyInstance} from 'fastify'
import { UserController } from '../../controllers/users/userController'
import { UserService } from '../../services/users/userService';
import { authMiddleware } from '../../middlewares/authUser';

const userService = new UserService();
const userController = new UserController(userService);

export default async function userRoutes(router:FastifyInstance) {
    router.get('/profile', {preHandler: authMiddleware}, userController.userView);
    // router.get('/profile/:id', {preHandler: authMiddleware}, userController.getUserById);
    router.post('/register', userController.createUser);
    router.put('/profile', {preHandler: authMiddleware}, userController.updateUser);
    router.post('/login', userController.loginUser);
    router.delete('/profile', {preHandler: authMiddleware}, userController.deleteUser);
}