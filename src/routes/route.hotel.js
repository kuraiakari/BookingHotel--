import express from "express";
import HotelController from "../controllers/controller.hotel.js";
import { verifyUser } from "../utils/auth.js";

const router = express.Router();
const hotelController = new HotelController();

router.get('/all', verifyUser, hotelController.getAllHotel);

router.get('/city/:city', hotelController.getHotelbyCity);

router.get('/rating/:city', hotelController.HotelbyRating);

router.get('/star/:city', hotelController.HotelbyStar);

router.get('/name/:hotelName', hotelController.getHotelbyName);

router.post('/', hotelController.upload, hotelController.createHotel);

router.put('/update/id:id', hotelController.put)

router.delete('/delete/id:id', hotelController.delete)

router.get('/id:id', verifyUser, hotelController.getbyId)

export default router;