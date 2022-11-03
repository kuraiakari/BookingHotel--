import model from "../models/index.js"

export const updateUtility =  async(id, data) => {
    try {
        const utility = await model.Utility.findByPk(id)
        if (utility) {
            utility.update(data)
        }
        return utility
    } catch (e) {
        throw new Error(e.message)
    }
}