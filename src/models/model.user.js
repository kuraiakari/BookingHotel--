import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING
    },
    nationality: {
        type: DataTypes.STRING
    },
    bankCard: {
        type: DataTypes.STRING
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {
        sequelize: db,
        modelName: 'USER'
})
export default User;