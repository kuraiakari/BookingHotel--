import { DataTypes, Model } from "sequelize";
import db from "../configs/dbconfig.js";

class Booking extends Model {}

Booking.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    guestNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
        sequelize:db,
        modelName: 'BOOKING'
})
export default Booking;