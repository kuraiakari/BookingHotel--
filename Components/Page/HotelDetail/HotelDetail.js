import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-native";

let deviceWidth = Dimensions.get("window").width;

const HotelDetail = () => {
  const data = useSelector((state) => state);
  useEffect(() => {
    fetch(`https://dream-hotelapp.herokuapp.com/v1/hotel/id${data.idHotel}`, {
      method: "GET",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHotel(data);
        setLikeHotel(data.favoriteHotels.message)
      });
  }, []);
  const [hotel, setHotel] = useState("");
  const [likeHotel, setLikeHotel] = useState(false)
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
    console.log(price)
    dispatch({ type: "TYPE_ROOM", payload: typeRoom });
    dispatch({ type: "PRICE_ROOM", payload: price });
  };
  const handleLikeHotel = () => {
    if (likeHotel) {
      fetch('https://dream-hotelapp.herokuapp.com/v1/favorite/delete/id' + data.idHotel, {
      method: "DELETE",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
    }
    else {
      const dataNew = {
        HOTELId: data.idHotel
      }
      fetch('https://dream-hotelapp.herokuapp.com/v1/favorite', {
      method: "POST",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
      body: JSON.stringify(dataNew)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
    }
  }

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
            {item.guestsAllowed} {item.bedType} {item.price}
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
          <Button
            title="Like"
            color={likeHotel ? "#f194ff" : "#2196f3"}
            onPress={() => {
              handleLikeHotel()
              setLikeHotel(!likeHotel)
            }}
          />
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
          <Text>{hotel.hotel.hotelName}</Text>
          <Text>{hotel.hotel.address}</Text>
          <Text>{hotel.hotel.details}</Text>
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
});

