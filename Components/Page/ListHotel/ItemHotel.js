import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-native";
import { useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";


let deviceWidth = Dimensions.get("window").width;

const Item = ({ name, city, rating, star, image }) => {
  const dispatch = useDispatch();
  const imageRender = image.split(",");
  const [indexImage, setIndexImage] = useState(0);
  // const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 10);
  // function onSwipeLeft() {
  //   console.log(1);
  //   if (indexImage < 2) setIndexImage(indexImage + 1);
  // }
  // function onSwipeRight() {
  //   console.log(3);
  //   if (indexImage > 0) setIndexImage(indexImage - 1);
  // }

  const handleReduxHotel = (nameHotel) => {
    dispatch({ type: "NAME_HOTEL", payload: nameHotel });
  };
    // console.log(imageRender);
    // const [indexImage, setIndexImage] = useState(0);
  return (
    <SafeAreaView style={styles.hotel}>
      <Button
        onPress={() => {
          if (indexImage > 0) setIndexImage(indexImage - 1);
        }}
        title="Back"
      ></Button>
      <Button
        onPress={() => {
          if (indexImage < 2) setIndexImage(indexImage + 1);
        }}
        title="Next"
      ></Button>
      <Image
        // onTouchStart={onTouchStart}
        // onTouchEnd={onTouchEnd}
        source={{
          uri:
            "https://dream-hotelapp.herokuapp.com/" + imageRender[indexImage],
        }}
        style={styles.imageHotel}
      />
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
        <View style={styles.line}></View>
        <View style={styles.boxPriceStarHotel}>
          <Text style={styles.textPriceStar}>$200 total</Text>
          <View style={styles.boxStarHotel}>
            <AntDesign
              name="star"
              size={14}
              color="#FFD166"
              style={{ marginRight: 3 }}
            />
            <Text style={styles.textPriceStar}>{star}</Text>
          </View>
        </View>
        <Link
          to="/hoteldetail"
          component={TouchableHighlight}
          activeOpacity={0.7}
          underlayColor="#ffffff"
          onPress={() => handleReduxHotel(name)}
        >
          <Text style={{margin: 20}}> More</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Item;

const styles = StyleSheet.create({
  hotel: {
    height: 400,
    borderColor: "#E6E8EC",
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
    paddingTop: 25,
  },

  boxNameRatingHotel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginBottom: 20,
  },
  textLocationHotel: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 15,
  },
  boxPriceStarHotel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  boxStarHotel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textPriceStar: {
    fontSize: 14,
    fontWeight: "600",
  },
  line: {
    width: deviceWidth - 92,
    height: 1.2,
    backgroundColor: "#E6E8EC",
    borderRadius: 44,
  },
});
