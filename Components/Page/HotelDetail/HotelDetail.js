import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-native";

const HotelDetail = () => {
  useEffect(() => {
    fetch("https://dream-hotelapp.herokuapp.com/v1/hotel/id1")
      .then((response) => response.json())
      .then((data) => setHotel(data));
  }, []);
  const [hotel, setHotel] = useState("");
  if (hotel) {
    let minPrice = 9999999999;
    hotel.rooms.forEach((room) => {
      if (room.price < minPrice) {
        minPrice = room.price;
      }
      const dataTest = room.utilities.split(",");
      room["arrayTienIch"] = dataTest;
    });
  }

  const navigete = useNavigate();
  const dispatch = useDispatch()
  const handlePressBack = () => {
    navigete(-1);
  };
  const handleDataRedux = (typeRoom, price) => {
    dispatch({ type: "TYPE_ROOM", payload: typeRoom });
    dispatch({ type: "PRICE_ROOM", payload: price });
  }
  const renderTienIch = ({ item }) => {
    return <Text>{item}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <Link to="/payment" onPress={() => handleDataRedux(`${item.guestsAllowed} ${item.bedType}`, item.price)}>
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
    <View style={{ margin: 30 }}>
      <Button
        title="Back"
        onPress={() => {
          handlePressBack();
        }}
      />
      <FlatList data={hotel.rooms} renderItem={renderItem} />
    </View>
  );
};

export default HotelDetail;
