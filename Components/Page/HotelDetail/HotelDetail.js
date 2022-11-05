import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

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
        setLikeHotel(data.favoriteHotels.message);
      });
  }, []);
  const [hotel, setHotel] = useState("");
  const [likeHotel, setLikeHotel] = useState(false);
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
  const handleDataRedux = (typeRoom, price, idRoom) => {
    dispatch({ type: "ID_ROOM", payload: idRoom });
    dispatch({ type: "TYPE_ROOM", payload: typeRoom });
    dispatch({ type: "PRICE_ROOM", payload: price });
  };
  const handleLikeHotel = () => {
    if (likeHotel) {
      fetch(
        "https://dream-hotelapp.herokuapp.com/v1/favorite/delete/id" +
          data.idHotel,
        {
          method: "DELETE",
          credentials: "included",
          headers: {
            "Content-Type": "application/json",
            Cookie: `access_token=${data.accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      const dataNew = {
        HOTELId: data.idHotel,
      };
      fetch("https://dream-hotelapp.herokuapp.com/v1/favorite", {
        method: "POST",
        credentials: "included",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${data.accessToken}`,
        },
        body: JSON.stringify(dataNew),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const renderTienIch = ({ item }) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Feather name="check-circle" size={20} color="#7369FF" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#343434",
            marginLeft: 5,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.boxBookRoom}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <FontAwesome5 name="bed" size={14} color="gray" />
          <Text style={styles.TextTypeOfRoom}> {item.bedType} </Text>
        </View>
        <FlatList data={item.arrayTienIch} renderItem={renderTienIch} />
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#7369FF" }}>
            {item.price}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#7369FF" }}>
            $ /night{" "}
          </Text>
        </View>
        <Link
          to="/payment"
          component={TouchableHighlight}
          activeOpacity={0.6}
          underlayColor="white"
          onPress={() =>
            handleDataRedux(`${item.bedType}`, item.price, item.id)
          }
          style={styles.button}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="calendar" size={20} color="#7369FF" />
            <Text style={styles.textButton}>Book</Text>
          </View>
        </Link>
      </View>
    );
  };

  const renderTienIchHotel = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.boxUtilities}>
        <Icon name={item.UTILITY.icon} color="#7369FF" size={15} />
        <Text style={styles.textUtilities}>{item.UTILITY.content}</Text>
      </View>
    );
  };

  const HeaderHotelDetail = () => {
    return (
      <View>
        {hotel && (
          <View>
            <View style={styles.containerImages}>
              <Grid>
                <Col>
                  <Image
                    source={{
                      uri:
                        "https://dream-hotelapp.herokuapp.com/" +
                        hotel.hotel.uriImage[0],
                    }}
                    style={styles.imageHotel}
                    resizeMode="cover"
                  />
                </Col>
                <Col>
                  <Row>
                    <Image
                      source={{
                        uri:
                          "https://dream-hotelapp.herokuapp.com/" +
                          hotel.hotel.uriImage[1],
                      }}
                      style={styles.imageHotel}
                      resizeMode="cover"
                    />
                  </Row>
                  <Row>
                    <Image
                      source={{
                        uri:
                          "https://dream-hotelapp.herokuapp.com/" +
                          hotel.hotel.uriImage[2],
                      }}
                      style={styles.imageHotel}
                      resizeMode="cover"
                    />
                  </Row>
                </Col>
              </Grid>
            </View>

            <Text style={styles.nameHotel}>{hotel.hotel.hotelName}</Text>
            <View style={styles.boxLocationHotel}>
              <Octicons name="location" size={20} color="#3C84C6" />
              <Text style={styles.textLocationHotel}>
                {hotel.hotel.address}
              </Text>
            </View>
            <FlatList
              data={hotel.hotelUtils}
              renderItem={renderTienIchHotel}
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            />
            <Text style={styles.textDetailHotel}>{hotel.hotel.details}</Text>
            <Text style={styles.typeOfRoom}>Type of room</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handlePressBack();
          }}
        >
          <Entypo name="chevron-left" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Detail</Text>
        <TouchableOpacity
          onPress={() => {
            handleLikeHotel();
            setLikeHotel(!likeHotel);
          }}
        >
          <AntDesign
            name="heart"
            size={20}
            color={likeHotel ? "#FA4F64" : "#D3DEDC"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={hotel.rooms}
          renderItem={renderItem}
          ListHeaderComponent={HeaderHotelDetail}
          bounces={false}
          style={styles.contentHotel}
        />
      </View>
    </SafeAreaView>
  );
};

export default HotelDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  contentHotel: {
    paddingHorizontal: 20,
  },
  containerImages: {
    width: "100%",
    height: 250,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginBottom: 15,
  },
  imageHotel: {
    width: "100%",
    height: "100%",
  },
  nameHotel: {
    fontSize: 20,
    fontWeight: "600",
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
    color: "#636363",
  },
  boxUtilities: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7369FF",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 40,
    marginBottom: 10,
    marginRight: 10,
  },
  textUtilities: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 10,
    color: "#7369FF",
  },
  textDetailHotel: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    color: "#343434",
  },
  typeOfRoom: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
  },
  boxBookRoom: {
    borderColor: "#E6E8EC",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#FCFCFD",
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  TextTypeOfRoom: {
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 15,
    borderRadius: 16,
    borderColor: "#7369FF",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "white",
  },
  textButton: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700",
    color: "#7369FF",
    marginLeft: 5,
  },
});
