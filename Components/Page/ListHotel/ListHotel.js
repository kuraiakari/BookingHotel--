import React, { useState, useEffect } from 'react'
import { View, Text, Image, SafeAreaView, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-native'

const Item = ({name, city, rating, star, image }) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{city}</Text>
            <Text>{rating}</Text>
            <Text>{star}</Text>
            <Text>Image of hotel</Text>
            <Image source={{ uri: image }} style={{width: 100, height: 50}} />
        </View>
    )
}

const ListHotel = () => {
    const data = useSelector(state => state)
    const city = data.nameCity
    const [listHotel, setListHotel] = useState(null)
    const linkNgrok = 'https://7f77-8-41-37-58.eu.ngrok.io/' //thay đổi theo lần dùng
    useEffect(() => {
        fetch(`${linkNgrok}` + `v1/hotel/byCity/${city}`)
        .then((response) => response.json())
        .then(data => setListHotel(data))
    }, [])
    Array.isArray(listHotel) && listHotel.forEach(hotel => {
        hotel.image = `${linkNgrok}` + hotel.image.replace(/\\/g, '/')
    });
    const renderItem = ({ item }) => {
        return <Item name={item.hotelName} city={item.city} rating={item.rating} star={item.star} image={item.image} />
    }
    const listEmptyComponent = () => {
        return <Text> Khong tim thay </Text>
    }
    const listFooterComponent = () => {
        return <Link to='/search'><Text>Back to searching</Text></Link>
    }
    return (
        <View>
            {
                listHotel === null && <Text>Loading</Text> //Có thể suy nghĩ về việc thêm hiệu ứng load trang
            }
            {
                listHotel && <SafeAreaView style={{margin: 50}}>
                    <FlatList
                        data={listHotel}
                        renderItem={renderItem}
                        keyExtractor={hotel => hotel.id}
                        ListEmptyComponent={listEmptyComponent}
                        ListFooterComponent={listFooterComponent}
                    />
                </SafeAreaView>
            }
        </View>
    )
}
export default ListHotel;