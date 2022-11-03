import model from "../models/index.js"

export const getById = async(id) => {
    const booking = await model.Booking.findByPk(id)

    if (booking) return booking

    throw new Error('Booking not found!')
  }

export const updateBooking =  async(id, data) => {
    try {
        const booking = await model.Booking.findByPk(id)
        if (booking) {
            booking.update(data)
        }
        return booking
    } catch (e) {
        throw new Error(e.message)
    }
}