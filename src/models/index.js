import Booking from "./model.booking.js"
import Hotel from "./model.hotel.js"
import Room from "./model.room.js"
import User from "./model.user.js"
import Favorite from "./model.favorite.js"
import Utility from "./model.utility.js"
import HotelUtility from "./model.hotelUtility.js"

//FK HOTELId in Table ROOM
Hotel.hasMany(Room, {
    onUpdate: 'CASCADE',
});
Room.belongsTo(Hotel);

//FK ROOMId USERId in Table BOOKING
Room.hasMany(Booking, {
    onUpdate: 'CASCADE',
});
User.hasMany(Booking, {
    onUpdate: 'CASCADE',
});
Booking.belongsTo(User, {
    onUpdate: 'CASCADE',
});
Booking.belongsTo(Room, {
    onUpdate: 'CASCADE',
});

//FK USERId HOTELId in Table FAVORITE
Favorite.belongsTo(User, {
    onUpdate: 'CASCADE',
});
Favorite.belongsTo(Hotel, {
    onUpdate: 'CASCADE',
});

//FK HOTELId UTILITIESId in Table HOTELUTILITIES
HotelUtility.belongsTo(Hotel)
HotelUtility.belongsTo(Utility) 

export default {Hotel, Booking, Room, User, Favorite, Utility, HotelUtility};
