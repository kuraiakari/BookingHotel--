import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"

class Utility extends Model {}

Utility.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        sequelize: db,
        modelName: 'UTILITY'
})
export default Utility;