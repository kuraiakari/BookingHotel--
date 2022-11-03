import express from "express";
import UtilityController from "../controllers/controller.utility.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();
const utilityController = new UtilityController(); 

router
.route('/all')
.get( verifyAdmin, utilityController.listUtility)

router
.route('/')
.post(verifyAdmin, utilityController.addUtility)

router
.route('/update/id:id')
.put(verifyAdmin, utilityController.updateUtility)

router
.route('/delete/id:id')
.delete(verifyAdmin, utilityController.deleteUtility)

export default router;