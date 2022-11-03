import express from "express";
import UserController from "../controllers/controller.user.js";
// import passport from "../middlewares/auth.js";
import { verifyUser, verifyAdmin } from "../utils/auth.js";

const router = express.Router();
const userController = new UserController();


router.get('/id:id', verifyUser, userController.getUser);

router.get('/all', verifyAdmin, userController.getallUsers);

router.put('/update/id:id', verifyUser, userController.updateUser);

router.delete('/delete/id:id', verifyAdmin, userController.deleteUser);


export default router;