import React, { useState, useEffect } from 'react'
import { View, Text, Image, SafeAreaView, FlatList, BackHandler, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-native'
// import { useNavigate } from 'react-router-dom'

import { useSwipe } from '../../../Hooks/useSwipe/useSwipe'

import Navigation from "../../Navigation/Navigation";


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

    const navigate = useNavigate()

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)
    function onSwipeLeft() {
        
    }
    function onSwipeRight(){
        navigate(-1)
    }


    const data = useSelector(state => state)
    const city = data.nameCity
    const [listHotel, setListHotel] = useState(null)
    const linkNgrok = 'https://dream-hotelapp.herokuapp.com/' //thay đổi theo lần dùng
    
    console.log(data)

    useEffect(() => {
        //fetch(`${linkNgrok}` + `v1/hotel/byCity/${city}`)
        fetch(`https://dream-hotelapp.herokuapp.com/v1/hotel/byCity/${city}`)
        .then((response) => response.json())
        .then(data => setListHotel(data))
    }, [])

    Array.isArray(listHotel) && listHotel.forEach(hotel => {
        hotel.image = `${linkNgrok}` + hotel.image.replace(/\\/g, '/')
    });
    const renderItem = ({ item }) => {
        return (
            <Link to={'/hotel/'+ item.hotelName}>
                <Item name={item.hotelName} city={item.city} rating={item.rating} star={item.star} image={item.image}/>
            </Link>
        )
    }
    const listEmptyComponent = () => {
        return <Text> Khong tim thay </Text>
    }
    const listFooterComponent = () => {
        return <Link to='/search'><Text>Back to searching</Text></Link>
    }
    return (
        <SafeAreaView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}> 
        {/* em muốn cái này luôn luôn phải chiếm 100% màn hình để lắng nghe sự kiện vuốt */}
            {
                listHotel === null && <Text>Loading</Text> //Có thể suy nghĩ về việc thêm hiệu ứng load trang
            }
            {
                listHotel && <View>
                    <Button title='Back' onPress={() => navigate(-1)}/>
                    <Text>{city}</Text>

                    
                    <SafeAreaView style={{margin: 50}}>
                        <FlatList
                            data={listHotel}
                            renderItem={renderItem}
                            keyExtractor={hotel => hotel.id}
                            ListEmptyComponent={listEmptyComponent}
                            ListFooterComponent={listFooterComponent}
                        />
                    </SafeAreaView>
                </View>
            }
        <Navigation/>
        </SafeAreaView>
    )
}
export default ListHotel;