import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"

class HotelUtility extends Model {}

HotelUtility.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
        sequelize: db,
        modelName: 'HOTELUTILITY'
})
export default HotelUtility