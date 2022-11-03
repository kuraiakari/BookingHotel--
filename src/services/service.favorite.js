import model from "../models/index.js"

export const getById = async(id) => {
    const favorite = await model.Favorite.findByPk(id)

    if (favorite) return favorite

    throw new Error('Favorite hotel not found!')
  }

export const updateFavorite =  async(id, data) => {
    try {
        const favorite = await model.Favorite.findByPk(id)
        if (favorite) {
            favorite.update(data)
        }
        return favorite
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getAllbyUserId = async(userId) => {
    const favorite = await model.Favorite.findAll({where:{USERId: userId}})
    var favHotel = [];
    for (let i=0; i < favorite.length; i++){
        favHotel.push(favorite[i].HOTELId)
    }
    if (favHotel.length > 0 ) return favHotel

    return {message:"No favorite hotels"}
}

export const getOnebyHotelId = async(hotelId, userId) => {
    const favorite = await model.Favorite.findOne({where:{
        HOTELId: hotelId,
        USERId: userId
    }})

    if (favorite) return {message:true}

    return {message:false}
}