import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"

class Favorite extends Model {}

Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
        sequelize: db,
        modelName: 'FAVORITE'
})
export default Favorite;