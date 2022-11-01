import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-native";

let deviceWidth = Dimensions.get("window").width;

const HotelDetail = () => {
  const data = useSelector((state) => state);
  useEffect(() => {
    fetch(`https://dream-hotelapp.herokuapp.com/v1/hotel/id${data.idHotel}`)
      .then((response) => response.json())
      .then((data) => setHotel(data));
  }, []);
  const [hotel, setHotel] = useState("");
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const handlePressBack = () => {
    navigete(-1);
  };
  if (hotel) {
    hotel.hotel.hotelImage = hotel.hotel.hotelImage.replace(/\\/g, "/");
    const changeUri = hotel.hotel.hotelImage.split(",");
    hotel.hotel["uriImage"] = changeUri;
    hotel.rooms.forEach((room) => {
      const dataTest = room.utilities.split(",");
      room["arrayTienIch"] = dataTest;
    });
  }
  const handleDataRedux = (typeRoom, price) => {
    dispatch({ type: "TYPE_ROOM", payload: typeRoom });
    dispatch({ type: "PRICE_ROOM", payload: price });
  };
  const renderTienIch = ({ item }) => {
    return <Text>{item}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <Link
        to="/payment"
        onPress={() =>
          handleDataRedux(`${item.guestsAllowed} ${item.bedType}`, item.price)
        }
      >
        <View>
          <Text>
            {item.guestsAllowed} {item.bedType}
          </Text>
          <FlatList data={item.arrayTienIch} renderItem={renderTienIch} />
        </View>
      </Link>
    );
  };

  return (
    <ScrollView style={{ margin: 30 }}>
      <Button
        title="Back"
        onPress={() => {
          handlePressBack();
        }}
      />
      {hotel && (
        <View>
          <Image
            source={{
              uri:
                "https://dream-hotelapp.herokuapp.com/" +
                hotel.hotel.uriImage[0],
            }}
            style={styles.imageHotel}
          />
          <Image
            source={{
              uri:
                "https://dream-hotelapp.herokuapp.com/" +
                hotel.hotel.uriImage[1],
            }}
            style={styles.imageHotel}
          />
          <Image
            source={{
              uri:
                "https://dream-hotelapp.herokuapp.com/" +
                hotel.hotel.uriImage[2],
            }}
            style={styles.imageHotel}
          />
          <Text>{data.nameHotel}</Text>
        </View>
      )}
      <FlatList data={hotel.rooms} renderItem={renderItem} />
    </ScrollView>
  );
};

export default HotelDetail;

const styles = StyleSheet.create({
  imageHotel: {
    width: deviceWidth - 42,
    height: 240,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
})