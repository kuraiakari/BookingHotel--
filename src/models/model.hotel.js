import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"

class Hotel extends Model {}

Hotel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    hotelName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cleanliness: {
        type: DataTypes.DOUBLE,
    },
    room: {
        type: DataTypes.DOUBLE,
    },
    service: {
        type: DataTypes.DOUBLE,
    },
    meals: {
        type: DataTypes.DOUBLE,
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotelImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    minPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    address: {
        type: DataTypes.STRING,
    },
    details: {
        type: DataTypes.STRING
    }
}, {
        sequelize: db,
        modelName: 'HOTEL'
})
export default Hotel;