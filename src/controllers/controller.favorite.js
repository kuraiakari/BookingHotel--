import model from "../models/index.js"

class FavoriteController {

    // POST v1/favorite/
    addFavorite = async (req, res) => {
        try {
            let data = {
                USERId : req.user.id,
                HOTELId : req.body.HOTELId,
            }
            const favoriteHotel = await model.Favorite.create(data)
            return res.status(201).json(favoriteHotel)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/favorite/
    listFavorite = async (req, res) => {
        try {
            const data = await model.Favorite.findAll({where: {USERId: req.user.id}, include: model.Hotel})
            if (data) return res.status(200).json(data)
            else return res.status(404).json({message:"No favorite hotels yet"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/favorite/delete/id:id
    deleteFavorites = async (req, res) => {
        try {
            const favorite = await model.Favorite.findOne({
                where: {
                    USERId : req.user.id,
                    HOTELId : req.params.id,
                }
            })
            if (favorite) {
                model.Favorite.destroy({where:{
                    USERId : req.user.id,
                    HOTELId : req.params.id,
                }})
                return res.status(200).json({message:"Successfully remove hotel"})
            } else return res.status(404).json({message:"Hotel not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}

export default FavoriteController