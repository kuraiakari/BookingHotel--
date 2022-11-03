import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js"
class Room extends Model {}

Room.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    guestsAllowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bedType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },
    utilities: {
        type: DataTypes.RANGE,
        allowNull: false,
    },
}, {
        sequelize: db,
        modelName: 'ROOM'
})
export default Room;