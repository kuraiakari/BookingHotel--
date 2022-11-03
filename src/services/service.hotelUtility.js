import model from "../models/index.js"

export const getById = async(id) => {
    const booking = await model.HotelUtility.findByPk(id)

    if (booking) return booking

    throw new Error('Booking not found!')
  }

export const updateHotelUtility =  async(id, data) => {
    try {
        const hotelUtil = await model.HotelUtility.findByPk(id)
        if (hotelUtil) {
            hotelUtil.update(data)
        }
        return hotelUtil
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getByHotelId = async (hotelId) => {
    const hotelUtils = await model.HotelUtility.findAll({
        where: {
            HOTELId: hotelId
        },
        include: model.Utility
    })
    if (hotelUtils) return hotelUtils
    else return {message: "No utils found for this hotel"}
}