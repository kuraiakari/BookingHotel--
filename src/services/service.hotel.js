import model from "../models/index.js"

export const getById = async(id) => {
    const hotel = await model.Hotel.findByPk(id)

    if (hotel) return hotel

    throw new Error('Hotel not found!')
  }

export const updateHotel =  async(id, data) => {
    try {
        const hotel = await model.Hotel.findByPk(id)
        if (hotel) {
            hotel.update(data)
        }
        return hotel
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getByName = async (hotelName) => {
    const hotel = await model.Hotel.findAll({
        where: {hotelName: hotelName}
    })
    if (hotel) return hotel

    throw new Error('Hotel not found')
}

export const getByCity = async (city) => {
    const hotel = await model.Hotel.findAll({
        where: {city: city}
    })
    if (hotel) return hotel

    throw new Error('Hotel not found')
}