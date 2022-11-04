import model from "../models/index.js"
import multer from 'multer'
import path from 'path'
import { getById, updateUser} from "../services/service.user.js"

class UserController {

    // v1/user/id:id
    getUser = async (req, res) => {
        try {
            const data = await model.User.findByPk(req.params.id)
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // v1/user/all
    getallUsers = async (_req, res) => {
        try {
            const customerData = await model.User.findAll();
            return res.status(200).json(customerData);

        } catch (e){
            return res.status(500).json({message: e.message})
        }
    }
    // v1/user/update/avatar/id:id
    updateUser = async (req, res) => {
        try {
            let userData = {
                image: req.file.path,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                nationality: req.body.nationality,
                bankCard: req.body.bankCard,
            }
            const user = getById(req.params.id)
            if (user) {
                const record = await updateUser(req.params.id, userData)
                return res.json(record)
            }
            else return res.status(404).json({message: "User not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    // v1/user/update/id:id
    updateUserwithoutAvatar = async (req, res) => {
        try {
            let userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                nationality: req.body.nationality,
                bankCard: req.body.bankCard,
            }
            const user = getById(req.params.id)
            if (user) {
                const record = await updateUser(req.params.id, userData)
                return res.json(record)
            }
            else return res.status(404).json({message: "User not found"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // v1/user/delete/id:id
    deleteUser = async (req, res) => {
        try {
            const user = getById(req.params.id)
            if (user) {
                const record = await model.User.destroy(user)
                return res.status(200).json({message:"Successfully deleted user"});
            }
            else return res.status(404).json({message: "Cannot find user"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images/users")
        },
        filename: (req, file, cb) => {
            cb(null, "user"+ Date.now()+ path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: '5000000'},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files format to upload');
        }
    }).single('image')
}

export default UserController