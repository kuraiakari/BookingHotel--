import express from "express";
import HotelUtilityController from "../controllers/controller.hotelUtility.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();
const hotelutilityController = new HotelUtilityController(); 

router
.route('/all')
.get( verifyAdmin, hotelutilityController.listUtility)

router
.route('/')
.post(verifyAdmin, hotelutilityController.addUtility)

router
.route('/delete/id:id')
.delete(verifyAdmin, hotelutilityController.deleteUtility)

export default router;