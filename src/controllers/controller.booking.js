import model from "../models/index.js"
import * as roomService from "../services/service.room.js"
import * as bookingService from "../services/service.booking.js"
import * as hotelService from "../services/service.hotel.js"

class BookingController {

    // POST v1/booking/
    createBooking = async (req, res) => {
        try {
            let room = await roomService.getById(req.body.ROOMId)
            let checkin = new Date(req.body.checkIn)
            let checkout = new Date(req.body.checkOut)
            if (room.guestsAllowed < req.body.guestNumber) return res.status(500).json({error:"Too many guests"})
            let data = {
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                bookingDate: new Date(),
                guestNumber: req.body.guestNumber,
                totalPrice: room.price * ((checkout - checkin)/ (1000 * 60 * 60 * 24)),
                status: req.body.status,
                ROOMId: req.body.ROOMId,
                USERId: req.user.id
            }
            const booking = await model.Booking.create(data)
            return res.status(201).json(booking)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    //GET v1/booking/
    listBooking = async (req, res) => {
        try {
            const booking = await model.Booking.findAll({
                where: {USERId: req.user.id},
                include: [
                    {model: model.Room, include: [ model.Hotel]}
                ]
            })
            if (booking) return res.status(200).json(booking)
            else return res.status(404).json({message: "No booking found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/booking/id:id
    getBooking = async (req, res) => {
        try {
            const booking = await model.Booking.findOne({
                where: {
                    USERId: req.user.id,
                    id: req.params.id
                },
                include: [
                    {model: model.Room, include: [ model.Hotel]}
                ]
            })
            if (booking) return res.status(200).json(booking)
            else return res.status(404).json({message: "No booking found"})   
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //PUT v1/booking/update/:id
    updateBooking = async (req, res) => {
        try {
            const booking = await bookingService.getById(req.params.id)
            if (booking) {
                booking.update(req.body, {where:{
                    id: req.params.id
                }});
                return res.status(200).json(booking)
            } else return res.status(404).json({message:"Cannot find booking"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/booking/delete/id:id
    deleteBooking = async (req, res) => {
        try {
            const booking = await bookingService.getById(req.params.id)
            console.log(booking)
            if (booking) {
                model.Booking.destroy({where: {
                    id: req.params.id
                }})
                return res.status(200).json({message:"Succesfully delete booking"})
            } else return res.status(404).json({message:"Booking not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

}

export default BookingController