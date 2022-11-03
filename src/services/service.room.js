import model from "../models/index.js"

export const getById = async(id) => {
    const room = await model.Room.findByPk(id, {
        include: model.Hotel,
      })

    if (room) return room

    throw new Error("Room not found")
}

export const getRooms = async() => {
    const rooms = await model.Room.findAll( {
        include: model.Hotel,
      })

    if (rooms) return rooms

    throw new Error("Room not found")
}

export const getRoomsbyHotelId = async(id) => {
    const rooms = await model.Room.findAll( { where: {HOTELId:id} })
    if (rooms) return rooms

    throw new Error("Room not found")
}

export const getRoomsbyCity = async(city) => {
    const rooms = await model.Room.findAll( {
        include: [{
            model: model.Hotel,
            required: true,
            where: { city: city}
        }],
      })

    if (rooms) return rooms

    throw new Error("Room not found")
}

export const updateRoom =  async(id, data) => {
    try {
        const room = await model.Room.findByPk(id)
        if (room) {
            room.update(data)
        }
        return room
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getRoomsbyHotel = async(hotelId) => {
    try {
        const rooms = await model.Room.findAll({where: {HOTELId: hotelId}})

        if (rooms) return rooms

        throw new Error("Rooms not found")

    } catch (e) {
        throw new Error(e.message)
    }
}