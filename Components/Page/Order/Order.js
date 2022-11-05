import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useLocation, Link } from "react-router-native";
import { useSelector, useDispatch } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

import Navigation from "../../Navigation/Navigation";

let deviceWidth = Dimensions.get("window").width;

const Order = () => {
  const data = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const [listHotel, setListHotel] = useState("");
  useEffect(() => {
    fetch(`https://dream-hotelapp.herokuapp.com/v1/booking`, {
      method: "GET",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListHotel(data);
      });
  }, []);

  const renderItem = ({ item }) => {
    const checkIn = item.checkIn.slice(0, 10);
    const checkOut = item.checkOut.slice(0, 10);
    console.log(item.ROOM.HOTEL.hotelName);

    var loopStar = [];
    for (let i = 0; i < 5; i++) {
      if (i < item.ROOM.HOTEL.star)
        loopStar.push(
          <View key={i}>
            <AntDesign
              name="star"
              size={14}
              color="#FFD166"
              style={{ marginRight: 3 }}
            />
          </View>
        );
      else
        loopStar.push(
          <View key={i}>
            <AntDesign
              name="star"
              size={14}
              color="lightgray"
              style={{ marginRight: 3 }}
            />
          </View>
        );
    }
    return (
      <View style={styles.order}>
        <Text style={styles.nameHotel}>{item.ROOM.HOTEL.hotelName}</Text>
        <View style={styles.boxLocationHotel}>
          <Octicons name="location" size={20} color="#3C84C6" />
          <Text style={styles.textLocationHotel}>
            {item.ROOM.HOTEL.address}
          </Text>
        </View>
        <View style={styles.boxStarHotel}>{loopStar}</View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style={styles.textCheckInOut}>{checkIn}</Text>
          <Entypo
            name="arrow-right"
            size={20}
            color="#7369FF"
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.textCheckInOut}>{checkOut}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Link
            to="/orderdetail"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
            onPress={() => {
              dispatch({ type: "ID_BOOKING", payload: item.id });
            }}
          >
            <Text style={{ color: "#7A71F7" }}>More</Text>
          </Link>
          <AntDesign name="right" size={13} color="#7A71F7" />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Entypo name="chevron-left" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Order</Text>
        <View style={{ width: 20 }}></View>
      </View>

      <FlatList
        data={listHotel}
        renderItem={renderItem}
        style={styles.hotels}
        bounces={false}
      />
      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  hotels: {
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 60,
  },
  order: {
    borderColor: "#E6E8EC",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#FCFCFD",
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  nameHotel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  boxLocationHotel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textLocationHotel: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  boxStarHotel: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  textCheckInOut: {
    fontSize: 14,
    fontWeight: "600",
  },
});
