import model from "../models/index.js"

class HotelUtilityController {

    // POST v1/hotelUtil/
    addUtility = async (req, res) => {
        try {
            const utility = await model.HotelUtility.create(req.body)
            return res.status(201).json(utility)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/hotelUtil/all
    listUtility = async (req, res) => {
        try {
            const data = await model.HotelUtility.findAll()
            if (data) return res.status(200).json(data)
            else return res.status(404).json({message:"No hotel utilities yet"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/hotelUtil/delete/id:id
    deleteUtility = async (req, res) => {
        try {
            const utility = await model.HotelUtility.findOne({
                where: {
                    id : req.params.id,
                }
            })
            if (utility) {
                model.HotelUtility.destroy({where:{
                    id : req.params.id,
                }})
                return res.status(200).json({message:"Successfully remove hotel utils"})
            } else return res.status(404).json({message:"Hotel utils not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}

export default HotelUtilityController