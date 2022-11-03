import model from "../models/index.js"

class UtilityController {

    // POST v1/utility/
    addUtility = async (req, res) => {
        try {
            const utility = await model.Utility.create(req.body)
            return res.status(201).json(utility)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //GET v1/utility/all
    listUtility = async (req, res) => {
        try {
            const data = await model.Utility.findAll()
            if (data) return res.status(200).json(data)
            else return res.status(404).json({message:"No utilities yet"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    //DELETE v1/utility/delete/id:id
    deleteUtility = async (req, res) => {
        try {
            const utility = await model.Utility.findOne({
                where: {
                    id : req.params.id,
                }
            })
            if (utility) {
                model.Utility.destroy({where:{
                    id : req.params.id,
                }})
                return res.status(200).json({message:"Successfully remove utils"})
            } else return res.status(404).json({message:"Utils not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}

export default UtilityController