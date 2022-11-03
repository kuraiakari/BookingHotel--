import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-native";
import { useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";

let deviceWidth = Dimensions.get("window").width;

const Item = ({ idHotel, name, city, rating, star, price, image }) => {
  const dispatch = useDispatch();
  const imageRender = image.split(",");
  const [indexImage, setIndexImage] = useState(0);
  // let imageRender1= imageRender.toString().replace(/\/g, "/");
  // const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 10);
  // function onSwipeLeft() {
  //   console.log(1);
  //   if (indexImage < 2) setIndexImage(indexImage + 1);
  // }
  // function onSwipeRight() {
  //   console.log(3);
  //   if (indexImage > 0) setIndexImage(indexImage - 1);
  // }

  const handleReduxHotel = (idHotel, nameHotel) => {
    dispatch({ type: "ID_HOTEL", payload: idHotel });
    dispatch({ type: "NAME_HOTEL", payload: nameHotel });
  };
  // console.log(imageRender);
  // const [indexImage, setIndexImage] = useState(0);
  var loopStar = [];
  for (let i = 0; i < 5 ; i++) {
    if (i < star) 
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
    )
  }
  // console.log(imageRender[0])
  return (
    <View style={styles.hotel}>
      <View style={styles.containerButtonLeftRight}>
        <TouchableOpacity
          onPress={() => {
            if (indexImage > 0) setIndexImage(indexImage - 1);
          }}
        >
          <View>
            <Entypo name="chevron-left" size={25} color="white" style={styles.shadowIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (indexImage < 2) setIndexImage(indexImage + 1);
          }}
        >
          <View>
            <Entypo name="chevron-right" size={25} color="white" style={styles.shadowIcon} />
          </View>
        </TouchableOpacity>
      </View>
      {/* <Button
        onPress={() => {
          if (indexImage < 2) setIndexImage(indexImage + 1);
        }}
        title="Next"
      ></Button> */}
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
          <Octicons name="location" size={20} color="#3C84C6" />
          <Text style={styles.textLocationHotel}>{city}</Text>
        </View>
        <View style={styles.boxStarHotel}>
          {loopStar}
        </View>
        <View style={styles.boxPriceMoreHotel}>
          <Text style={styles.textPriceStar}>${price} total</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Link
              to="/hoteldetail"
              component={TouchableHighlight}
              activeOpacity={0.7}
              underlayColor="#ffffff"
              onPress={() => handleReduxHotel(idHotel, name)}
            >
              <Text style={{color: '#7A71F7'}}> More  </Text>
            </Link>
            <AntDesign name="right" size={13} color='#7A71F7' />
          </View>
          
        </View>
        
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  hotel: {
    height: 400,
    borderColor: "#E6E8EC",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderWidth: 1,
    marginBottom: 40,
    backgroundColor: '#FCFCFD',
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  imageHotel: {
    width: deviceWidth - 42,
    height: 240,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  containerButtonLeftRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth - 62,
    zIndex: 2,
    position: 'absolute',
    top: 240 / 2 - 25 / 2,
    right: 10,
    left: 10
  },
  shadowIcon: {
    shadowColor: '#3b3a3a',
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  infoHotel: {
    paddingHorizontal: 25,
    paddingTop: 20,
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
    marginLeft: 15,
  },
  boxPriceMoreHotel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
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
});
