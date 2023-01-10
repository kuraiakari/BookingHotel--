import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const StatusBooking = () => {
  const data = useSelector((state) => state);
  const ngrok = data.linkNgrok
  const [status, setStatus] = useState("");
  const currentData = new Date();
  useEffect(() => {
    const dataBooking = {
      checkIn:
        data.checkIn.getUTCFullYear() +
        "-" +
        (data.checkIn.getUTCMonth() + 1) +
        "-" +
        data.checkIn.getUTCDate(),
      checkOut:
        data.checkOut.getUTCFullYear() +
        "-" +
        (data.checkIn.getUTCMonth() + 1) +
        "-" +
        data.checkOut.getUTCDate(),
      bookingDate:
        currentData.getUTCFullYear() +
        "-" +
        (currentData.getUTCMonth() + 1) +
        "-" +
        currentData.getUTCDate(),
      guestNumber: data.numberAdults + data.numberChildrens,
      ROOMId: data.idRoom,
      status: false,
      totalPrice:
        data.priceRoom * ((data.checkOut - data.checkIn) / (24 * 3600 * 1000)),
    };
    console.log(dataBooking);
    fetch(`${ngrok}/v1/booking`, {
      method: "POST",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
      body: JSON.stringify(dataBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message || data.error) setStatus("Error");
        else setStatus("Success !");
      });
  }, []);
  console.log(status);
  return (
    <SafeAreaView style={styles.container}>
      {status === null && (
        <View>
          <ActivityIndicator size="large" />
          <Text style={{ paddingTop: 10, fontSize: 15 }}>Loading</Text>
        </View>
      )}
      {status === "Success !" && (
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/scf.jpg")}
            style={styles.image}
          />
          <Text style={styles.textStatus}>{status}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.textNoti}>Your room is booked</Text>
            <Text style={styles.textNoti}>Please follow up in Order</Text>
          </View>
          <Link
            to="/search"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#8078f5"
            style={styles.button}
          >
            <Text style={styles.textButton}>Home</Text>
          </Link>
        </View>
      )}
      {status === "Error" && (
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/err.jpg")}
            style={styles.image}
            // resizeMode='cover'
          />
          <Text style={styles.textStatus}>{status}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.textNoti}>Your room isn't booked</Text>
            <Text style={styles.textNoti}>
              Please back to book another room
            </Text>
          </View>
          <Link
            to="/search"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#8078f5"
            style={styles.button}
          >
            <Text style={styles.textButton}>Back</Text>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StatusBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: deviceWidth / 2,
    height: deviceHeight * 0.45,
    borderRadius: 15,
    marginVertical: 20,
  },
  textStatus: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "600",
    color: "#343434",
    marginBottom: 0,
  },
  textNoti: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
    color: "#636363",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 10,
    borderColor: "#7369FF",
    borderWidth: 1,
    width: deviceWidth - 40,
    backgroundColor: "white",
    marginTop: 30,
  },
  textButton: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
    color: "#7369FF",
    marginLeft: 5,
  },
});
