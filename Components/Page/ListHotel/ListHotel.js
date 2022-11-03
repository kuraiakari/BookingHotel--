import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  BackHandler,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-native";
import { useDispatch } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
// import { useNavigate } from 'react-router-dom'

import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";

import Item from "./ItemHotel";
import Navigation from "../../Navigation/Navigation";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const ListHotel = () => {
  const navigate = useNavigate();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 4);
  function onSwipeLeft() {
    console.log(2);
  }
  function onSwipeRight() {
    navigate(-1);
  }

  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const city = data.nameCity;
  const [listHotel, setListHotel] = useState(null);

  const location = useLocation();
//   console.log(listHotel)
  useEffect(() => {
    //fetch(`${linkNgrok}` + `v1/hotel/byCity/${city}`)
    fetch(`https://dream-hotelapp.herokuapp.com/v1/hotel/city/${city}`)
      .then((response) => response.json())
      .then((data) => setListHotel(data));
  }, []);
  listHotel &&
    listHotel.hotels.forEach((hotel) => {
      hotel.hotelImage = hotel.hotelImage.replace(/\\/g, "/");
    });
    
    
  const renderItem = ({ item }) => {
    return (
      <View
      // to={'/hoteldetail'}
      // component={TouchableHighlight}
      // activeOpacity={0.7}
      // underlayColor="#ffffff"
      // onPress={() => handleReduxHotel(item.hotelName)}
      >
        <Item
          idHotel={item.id}
          name={item.hotelName}
          city={item.city}
          rating={item.rating}
          star={item.star}
          price={item.minPrice}
          image={item.hotelImage}
        />
      </View>
    );
  };
  const listEmptyComponent = () => {
    return <Text> Khong tim thay </Text>;
  };
  const listFooterComponent = () => {
    return (
      <Link
        to="/search"
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
      >
        <Text>Back to searching</Text>
      </Link>
    );
  };
  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {listHotel === null && (
        <View>
          <ActivityIndicator size="large" />
          <Text style={{ paddingTop: 10, fontSize: 15 }}>Loading</Text>
        </View>
      )}
      {listHotel && (
        <View style={styles.subContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigate(-1)}>
              <Entypo name="chevron-left" size={20} color="#7369FF" />
            </TouchableOpacity>
            <Text style={styles.textHeader}>{city}</Text>
            <View style={{ width: 20 }}></View>
          </View>

          <View>
            <FlatList
              style={styles.hotels}
              data={listHotel.hotels}
              renderItem={renderItem}
              keyExtractor={(hotel) => hotel.id}
              ListEmptyComponent={listEmptyComponent}
              ListFooterComponent={listFooterComponent}
              nestedScrollEnabled
            />
          </View>
        </View>
      )}
      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};
export default ListHotel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  hotels: {
    paddingHorizontal: 20,
    marginBottom: 150,
  },
});
