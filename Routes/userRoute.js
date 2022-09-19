import express from "express";
import { deleteUser, getAllUsers, getUser, registerUser, updateUser, userLogin } from "../Controller/userController.js";


const userRouter = express.Router();



userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUser);

userRouter.post('/signup', registerUser);

userRouter.post('/login', userLogin);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);





export default userRouter;