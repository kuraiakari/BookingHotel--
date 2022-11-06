import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

let deviceWidth = Dimensions.get("window").width;

const OrderDetail = () => {
  const data = useSelector((state) => state);
  const navigate = useNavigate();
  const [booking, setBooking] = useState("");
  useEffect(() => {
    fetch(
      `https://dream-hotelapp.herokuapp.com/v1/booking/id${data.idBooking}`,
      {
        method: "GET",
        credentials: "included",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${data.accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBooking(data);
      });
  }, []);
  // let hotelImage1;
  // let hotelImage2;
  // let hotelImage3;
  // if (booking) {
  //   hotelImage1 = booking.ROOM.HOTEL.hotelImage.split(",")[0].replace(/\\/g, "/");
  //   hotelImage2 = booking.ROOM.HOTEL.hotelImage.split(",")[1].replace(/\\/g, "/");
  //   hotelImage3 = booking.ROOM.HOTEL.hotelImage.split(",")[2].replace(/\\/g, "/");
  // }
  const currentTime = new Date();
  // console.log(currentTime, booking.checkOut.split(8,9))
  const sosanh = (checkDay) => {
    if (currentTime.getFullYear() < checkDay.slice(0, 4)) return true;
    if (currentTime.getMonth() + 1 < checkDay.slice(5, 7)) return true;
    if (currentTime.getDate() < checkDay.slice(8, 10)) return true;
    return false;
  };

  var loopStar = [];
  if (booking) {
    for (let i = 0; i < 5; i++) {
      if (i < booking.ROOM.HOTEL.star)
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Confirmation</Text>
        <View style={{ width: 20 }}></View>
      </View>
      {booking && (
        <View style={styles.subContainer}>
          <View style={styles.boxHotel}>
            <View>
              {sosanh(booking.checkIn) ? (
                <View style={styles.boxStatus}>
                  <Entypo
                    name="aircraft-take-off"
                    size={30}
                    color="lightgray"
                  />
                  <Text style={styles.textStatus}>Incoming trip</Text>
                </View>
              ) : sosanh(booking.checkOut) ? (
                <View style={styles.boxStatus}>
                  <Entypo name="briefcase" size={20} color="lightgray" />
                  <Text style={styles.textStatus}>In progress </Text>
                </View>
              ) : (
                <View style={styles.boxStatus}>
                  <AntDesign name="checkcircle" size={20} color="lightgray" />
                  <Text style={styles.textStatus}>Accomplished </Text>
                </View>
              )}
            </View>
            <Text style={styles.nameHotel}>{booking.ROOM.HOTEL.hotelName}</Text>
            <View style={styles.boxLocationHotel}>
              <Octicons name="location" size={20} color="#7369FF" />
              <Text style={styles.textLocationHotel}>
                {booking.ROOM.HOTEL.address}
              </Text>
            </View>
            <View style={styles.boxStarHotel}>{loopStar}</View>

            <View style={styles.boxCheckInOut}>
              <View>
                <Text style={styles.textCheckInOut}>Check-in</Text>
                <Text style={styles.textDateCheckInOut}>
                  {booking.checkIn.slice(0, 10)}
                </Text>
              </View>
              <View>
                <Text style={styles.textCheckInOut}>Check-out</Text>
                <Text style={styles.textDateCheckInOut}>
                  {booking.checkOut.slice(0, 10)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.boxHotel}>
            <Text style={styles.textTypeRoom}>{booking.ROOM.bedType}</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Text>Room for </Text>
              <Text style={styles.textGuest}>{booking.guestNumber}</Text>
              <Text> people</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textGuest}>Paid: </Text>
              <Text style={styles.textPrice}>{booking.totalPrice}</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    paddingHorizontal: 20,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  subContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  boxStatus: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#e8e8e8",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  textStatus: {
    // color: "#636363",
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },
  boxStarHotel: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  nameHotel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  boxLocationHotel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textLocationHotel: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 15,
  },
  boxCheckInOut: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  textCheckInOut: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    marginBottom: 5,
  },
  textDateCheckInOut: {
    fontSize: 18,
    fontWeight: "500",
  },
  boxHotel: {
    borderColor: "#E6E8EC",
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FCFCFD",
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  textTypeRoom: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  textGuest: {
    fontSize: 14,
    fontWeight: "600",
  },
  textPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
});
