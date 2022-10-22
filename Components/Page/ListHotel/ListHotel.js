import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, SafeAreaView, TouchableHighlight, ActivityIndicator, FlatList, BackHandler, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
// import { useNavigate } from 'react-router-dom'

import { useSwipe } from '../../../Hooks/useSwipe/useSwipe'

import Navigation from "../../Navigation/Navigation";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const Item = ({name, city, rating, star, image }) => {
    return (
        <View style={styles.hotel}>
            <Image source={{ uri: image }} style={styles.imageHotel} />
            <View style={styles.infoHotel}>
                <View style={styles.boxNameRatingHotel}>
                    <Text style={styles.nameHotel}>{name}</Text>
                    <View style={styles.boxRatingHotel}>
                        <Text style={styles.ratingHotel}>{rating}</Text>
                    </View>
                </View>
                <View style={styles.boxLocationHotel}>
                    <Octicons name="location" size={20} />
                    <Text style={styles.textLocationHotel}>{city}</Text>
                </View>
                <View style={ styles.line }></View>
                <View style={styles.boxPriceStarHotel}>
                    <Text style={styles.textPriceStar}>$200 total</Text>
                    <View style={styles.boxStarHotel}>
                        <AntDesign name="star" size={14} color="#FFD166" style={{marginRight: 3}} />
                        <Text style={styles.textPriceStar}>{star}</Text>
                    </View>
                </View>
            </View>
            
        </View>
    )
}

const ListHotel = () => {

    const navigate = useNavigate()

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2)
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
            <Link 
            to={'/hotel/'+ item.hotelName}
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
            >
                <Item name={item.hotelName} city={item.city} rating={item.rating} star={item.star} image={item.image}/>
            </Link>
        )
    }
    const listEmptyComponent = () => {
        return <Text> Khong tim thay </Text>
    }
    const listFooterComponent = () => {
        return (
        <Link 
        to='/search'
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
        >
            <Text>Back to searching</Text>
        </Link>
        )
    }
    return (
        <SafeAreaView style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* em muốn cái này luôn luôn phải chiếm 100% màn hình để lắng nghe sự kiện vuốt */}
            {
                listHotel === null &&
                <View>
                    <ActivityIndicator size="large"/>
                    <Text style={{paddingTop: 10, fontSize: 15}}>Loading</Text>
                </View>
                 //Có thể suy nghĩ về việc thêm hiệu ứng load trang
            }
            {
                listHotel && <View style={styles.subContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate(-1)}>
                            <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>{city}</Text>
                        <View></View>
                    </View>
                    

                    
                    <View >
                        <FlatList
                            style={styles.hotels}
                            data={listHotel}
                            renderItem={renderItem}
                            keyExtractor={hotel => hotel.id}
                            ListEmptyComponent={listEmptyComponent}
                            ListFooterComponent={listFooterComponent}
                            nestedScrollEnabled 
                        />
                    </View>
                </View>
            }
        <Navigation/>
        </SafeAreaView>
    )
}
export default ListHotel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, 
    subContainer: {
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: deviceWidth,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    textHeader: {
        color: '#7369FF',
        fontSize: 24,
        fontWeight: '600',
    },
    hotels: {
        paddingHorizontal: 20,
        marginBottom: 150,
    },
    hotel: {
        height: 400,
        borderColor: '#E6E8EC',
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 30,
    },
    imageHotel: {
        width: deviceWidth - 42,
        height: 240,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    infoHotel: {
        paddingHorizontal: 25,
        paddingTop: 25
    },

    boxNameRatingHotel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    nameHotel: {
        fontSize: 18,
        fontWeight: '700',
    },
    boxRatingHotel: {
        borderWidth: 1.3,
        borderColor: '#7A71F7',
        borderRadius: 4,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingHotel: {
        color: '#7A71F7',
        fontWeight: '700',
        fontSize: 12
    },
    boxLocationHotel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textLocationHotel: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 15
    },
    boxPriceStarHotel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    boxStarHotel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPriceStar: {
        fontSize: 14,
        fontWeight: '600',
    },
    line: {
        width: deviceWidth - 92,
        height: 1.2,
        backgroundColor: "#E6E8EC",
        borderRadius: 44,
    },
})