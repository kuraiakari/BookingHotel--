import model from "../models/index.js";
import multer from "multer";
import path from "path";
import * as hotelService from "../services/service.hotel.js"
import * as roomService from "../services/service.room.js"
import * as favoriteService from "../services/service.favorite.js"
import * as hotelUtilsService from "../services/service.hotelUtility.js"



class HotelController {
    // POST v1/hotel/
    createHotel = async (req, res) => {
        try {
            let img = "";
            req.files.forEach(file => {
                img += file.path + ","
            })
            let hotelData = {
                hotelImage: img,
                hotelName : req.body.hotelName,
                city : req.body.city,
                rating : req.body.rating,
                // cleanliness: 0,
                // room: 0,
                // service: 0,
                // meals: 0,
                star : req.body.star
            }

            const hotel = await model.Hotel.create(hotelData)

            return res.status(201).json(hotel)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // GET v1/hotel/all
    getAllHotel = async (req, res) => {
        try {
            const hotels = await model.Hotel.findAll();
            if (hotels && req.user) {
                const favoriteHotels = await favoriteService.getAllbyUserId(req.user.id)
                return res.status(200).json({hotels, favoriteHotels})
            }
            else if (hotels) return res.status(200).json({hotels, message: "No favorite hotels"})
            else return res.status(404).json({message:"No hotel found"})

        } catch (e){
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/hotel/id:id
    getbyId = async (req, res) => {
        try {
            const hotel = await hotelService.getById(req.params.id)
            const rooms = await roomService.getRoomsbyHotel(req.params.id)
            const favoriteHotels = await favoriteService.getOnebyHotelId(req.params.id, req.user.id)
            const hotelUtils = await hotelUtilsService.getByHotelId(req.params.id)
            return res.status(200).json({hotel, rooms, favoriteHotels, hotelUtils})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // GET v1/hotel/rating/:city
    HotelbyRating = async (req, res) => {
        try {
            const data = await model.Hotel.findAll({
                where:  {city: req.params.city},
                order: [
                    ['rating', 'DESC']
                ]
            })
            if (data) return res.status(200).json(data);
            else return res.status(404).json({message: "No hotels found"}) 
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // GET v1/hotel/star/:city
    HotelbyStar = async (req, res) => {
        try {
            const data = await model.Hotel.findAll({
                where: {city: req.params.city},
                order: [
                    ['star', 'DESC']
                ]
            })
            if (data) return res.status(200).json(data)
            else return res.status(404).json({message: "No hotels found"})

        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    // GET v1/hotel/name/:hotelName
    getHotelbyName = async (req, res) => {
        try {
            const hotels = await hotelService.getByName(req.params.hotelName)
            if (hotels && req.user) {
                const favoriteHotels = await favoriteService.getAllbyUserId(req.user.id)
                return res.status(200).json({hotels, favoriteHotels})
            }
            else if (hotels) return res.status(200).json({hotels, message: "No favorite hotels"})
            else return res.status(404).json({message:"No hotel found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // GET v1/hotel/city/:city
    getHotelbyCity = async (req, res) => {
        try {
            const hotels = await hotelService.getByCity(req.params.city);
            if (hotels && req.user) {
                const favoriteHotels = await favoriteService.getAllbyUserId(req.user.id)
                return res.status(200).json({hotels, favoriteHotels})
            }
            else if (hotels) return res.status(200).json({hotels, message: "No favorite hotels"})
            else return res.status(404).json({message:"No hotel found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //PUT v1/hotel/update/id:id

    put = async (req, res) => {
        try {
            const hotel = await hotelService.getById(req.params.id)
            if (hotel) {
                const record = await hotelService.updateHotel(req.params.id, req.body)
                return res.json(record)
            } else return res.status(404).json({message:"Hotel not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/hotel/delete/:id
    delete = async (req, res) => {
        try {
            const hotel = await model.Hotel.findByPk(req.params.id)
            if (hotel) {
                model.Hotel.destroy(hotel)
                return res.status(200).json({message:"Successfully delete hotel"})
            } else return res.status(404).json({message:"Hotel not found"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images/hotels")
        },
        filename: (req, file, cb) => {
            cb(null,"hotel"+ Date.now() + path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: '1000000'},
        fileFilter: (req, file, cb)  =>{
            const fileTypes = /jpeg|jpg|png|jfif/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files format to upload');
        }
    }).array('images', 3)
}

export default HotelController