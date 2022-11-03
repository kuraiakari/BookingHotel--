import model from "../models/index.js";
import multer from "multer";
import path from "path";
import * as roomService from "../services/service.room.js"
import * as hotelService from "../services/service.hotel.js"


class RoomController {

    //POST v1/room/
    createRoom = async (req, res) => {
        try {
            // let data = {
            //     image: req.file.path,
            //     guestNumber: req.body.guestNumber,
            //     price: req.body.price,
            //     status: req.body.status,
            //     utilities: req.body.utilities,
            //     HOTELId: req.body.HOTELId
            // }
            const room = await model.Room.create(req.body)
            const rooms = await roomService.getRoomsbyHotelId(room.HOTELId)
            const hotel = await hotelService.getById(room.HOTELId)
            var minPrice = room.price
            for (let i=0; i< rooms.length;i++){
                if (minPrice > rooms[i].price) minPrice = rooms[i].price
                hotel.update({minPrice: minPrice})
            }
            return res.status(201).json(room)   
        } catch (e) {
            return res.status(500).json({message: e.message})

        }
    }

    //GET v1/room/:id
    getRoom = async (req, res) => {
        try {
            const data = await roomService.getById(req.params.id)
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/room/all
    getAllRooms = async (req, res) => {
        try {
            const data = await roomService.getRooms()
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }    
    }

    //GET v1/room/city/:city
    getAllRoomsbyCity = async (req, res) => {
        try {
            const data = await roomService.getRoomsbyCity(req.params.city)
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }    
    }

    //PUT v1/room/update/id:id
    updateRoom = async (req, res) => {
        try {
            const room = roomService.getById(req.params.id)
            if (room) {
                const record = await roomService.updateRoom(req.params.id, req.body)
                return res.json(record)
            }
            else return res.status(404).json({message: "Room not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/room/delete/id:id
    deleteRoom = async (req, res) => {
        try {
            const room = roomService.getById(req.params.id)
            if (room) {
                model.Room.destroy({where: {id: req.params.id}})
                return res.status(200).json({message:"Successfully delete room"})
            } else return res.status(404).json({message:"Room not found"})
        } catch (e) {
            return res.status(500).json({message: "Something went wrong"})
        }
    }


    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images/rooms")
        },
        filename: (req, file, cb) => {
            cb(null, "room"+ Date.now() + path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: '1000000'},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files format to upload');
        }
    }).single('image')
//  }).array('images',3)
}

export default RoomController