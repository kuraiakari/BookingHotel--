import express from 'express';

import hotel from './route.hotel.js';
import room from './route.room.js';
import customer from './route.user.js';
import booking from './route.booking.js';
import auth from './route.auth.js'
import favorite from './route.favorite.js'
import utility from './route.utility.js'
import hotelUtility from './route.hotelUtility.js'


const router = express.Router();

router.use('/hotel', hotel);
router.use('/room', room);
router.use('/user', customer);
router.use('/booking', booking);
router.use('/auth', auth)
router.use('/favorite', favorite)
router.use('/utility', utility)
router.use('/hotelUtil', hotelUtility)


export default router;