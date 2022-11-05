import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocation } from "react-router-native";
import { useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import Navigation from "../../Navigation/Navigation";

let deviceWidth = Dimensions.get("window").width;

const LikeHotel = () => {
  const data = useSelector((state) => state);
  const location = useLocation();
  const [listLike, setListLike] = useState();
  const [deleteLike, setDeleteLike] = useState(false);
  useEffect(() => {
    fetch(`https://dream-hotelapp.herokuapp.com/v1/favorite`, {
      method: "GET",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListLike(data);
      });
  }, [deleteLike]);

  const handleDelete = (id) => {
    fetch("https://dream-hotelapp.herokuapp.com/v1/favorite/delete/id" + id, {
      method: "DELETE",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${data.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeleteLike(!deleteLike);
      });
  };

  const renderItem = ({ item }) => {
    var loopStar = [];
    for (let i = 0; i < 5; i++) {
      if (i < item.HOTEL.star)
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
      <View style={styles.hotel}>
        <View style={styles.boxNameRatingHotel}>
          <Text style={styles.nameHotel}>{item.HOTEL.hotelName}</Text>
          <View style={styles.boxRatingHotel}>
            <Text style={styles.ratingHotel}>{item.HOTEL.rating}</Text>
          </View>
        </View>
        <View style={styles.boxLocationHotel}>
          <Octicons name="location" size={20} color="#3C84C6" />
          <Text style={styles.textLocationHotel}>{item.HOTEL.address}</Text>
        </View>

        <View style={styles.boxStarHotel}>{loopStar}</View>
        <View style={styles.containerButtonLike}>
          <TouchableOpacity onPress={() => handleDelete(item.HOTEL.id)}>
            <AntDesign name="heart" size={20} color="#FA4F64" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Entypo name="chevron-left" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Saved</Text>
        <View style={{ width: 20 }}></View>
      </View>

      <FlatList data={listLike} renderItem={renderItem} style={styles.hotels} />
      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};

export default LikeHotel;

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
  hotels: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 130,
  },
  hotel: {
    borderColor: "#E6E8EC",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FCFCFD",
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  boxNameRatingHotel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nameHotel: {
    fontSize: 18,
    fontWeight: "700",
  },
  boxRatingHotel: {
    borderWidth: 1.3,
    borderColor: "#7A71F7",
    borderRadius: 4,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingHotel: {
    color: "#7A71F7",
    fontWeight: "700",
    fontSize: 12,
  },
  boxLocationHotel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  },
  textPriceStar: {
    fontSize: 14,
    fontWeight: "600",
  },
  containerButtonLike: {
    width: "100%",
    alignItems: "flex-end",
  },
});
