import express from "express"
import BookingController from "../controllers/controller.booking.js"
import { verifyAdmin, verifyUser } from "../utils/auth.js"

const router = express.Router()
const bookingController = new BookingController()


router.get('/', verifyUser, bookingController.listBooking)

router.get('/id:id', verifyUser, bookingController.getBooking)

router.post('/', verifyUser, bookingController.createBooking)

router.put('/update/:id', verifyAdmin, bookingController.updateBooking)

router.delete('/delete/id:id', verifyAdmin, bookingController.deleteBooking)

export default router