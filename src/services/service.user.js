import model from "../models/index.js"

export const getById = async(id) => {
    const user = await model.User.findByPk(id)

    if (user) return user

    throw new Error('Not found!')
  }

export const updateUser =  async(id, data) => {
    try {
        const user = await model.User.findByPk(id)
        if (user) {
            user.update(data)
        }
        return user
    } catch (e) {
        throw new Error(e.message)
    }
}