import express from "express";
import FavoriteController from "../controllers/controller.favorite.js";
import { verifyAdmin, verifyUser } from "../utils/auth.js";

const router = express.Router();
const favoriteController = new FavoriteController(); 

router
.route('/')
.get( verifyUser, favoriteController.listFavorite)

router
.route('/')
.post(verifyUser, favoriteController.addFavorite)

router
.route('/delete/id:id')
.delete(verifyUser, favoriteController.deleteFavorites)

export default router;