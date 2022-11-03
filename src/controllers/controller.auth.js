import model from "../models/index.js"
import jwt from "jsonwebtoken"

class AuthController {
        // v1/auth/register
        register = async (req, res) => {
            try {
                const user = await model.User.findOne({where: {email: req.body.email}})
                if (user) {
                    return res.status(400).json({ error: "User with specified email already exists"})
                }
                const customerData = await model.User.create(req.body);
                return res.status(201).json(customerData);
            } catch (e) {
                return res.status(500).json({error: e.message});
            }
        }
    
        // v1/auth/login
        login = async (req,res) => {
            try {

                const user = await model.User.findOne({where: {
                    email: req.body.email}
                })
                if (user) {
                    if (req.body.password != user.password) return res.status(400).json({error:"Email or Password is wrong"});
    
                    const token = jwt.sign(
                        {id: user.id, isAdmin: user.isAdmin}, 
                        // jwtOptions.secretOrKey,
                        process.env.JWT,
                        {
                            expiresIn: "1h",
                        });
                    return res.json({token, id:user.id})
                }
                else return res.status(400).json({error:"Email is not registered"})
            } catch (err) {
                return res.status(500).json({error: err.message})
            }
        }
}

export default AuthController