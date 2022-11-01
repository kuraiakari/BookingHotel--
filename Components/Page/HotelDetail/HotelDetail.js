import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

const HotelDetail = () => {
    useEffect(() => {
        fetch('https://dream-hotelapp.herokuapp.com/v1/hotel/id1')
        .then(response => response.json())
        .then(data => setHotel(data))
    }, [])
    const [hotel, setHotel] = useState('')
    if ( hotel ) {
        let minPrice = 9999999999
        hotel.rooms.forEach(room => {
            if (room.price < minPrice) {
                minPrice = room.price
            }    
            const dataTest = room.utilities.split(",")
            room['arrayTienIch'] = dataTest
        });
    }
    const renderTienIch = ({item}) => {
        return (
            <Text>{item}</Text>
        )
    }

    const renderItem = ({ item }) => {
        return(
            <View style={{margin: 30}}>
                <Text>{item.guestsAllowed} {item.bedType}</Text>
                <FlatList
                    data={item.arrayTienIch}
                    renderItem={renderTienIch}
                />
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={hotel.rooms}
                renderItem = { renderItem }
            />
        </View>
    )
}

export default HotelDetail