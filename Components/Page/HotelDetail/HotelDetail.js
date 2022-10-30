import React, {} from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

const HotelDetail = () => {
    const data = useSelector(state => state)
    console.log(data.nameHotel)
}

export default HotelDetail