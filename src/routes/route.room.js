import express from "express";
import RoomController from "../controllers/controller.room.js";

const router = express.Router();
const roomController = new RoomController(); 


router.post('/', roomController.upload, roomController.createRoom);

router.get('/id:id', roomController.getRoom)

router.get('/all', roomController.getAllRooms)

router.put('/update/id:id', roomController.updateRoom)

router.delete('/delete/id:id', roomController.deleteRoom)

export default router;