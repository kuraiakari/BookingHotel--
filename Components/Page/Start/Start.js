import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-native";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const AppearLogoInView = (props) => {
  const appearAnim = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: { x: -70, y: 185 },
      delay: 200, //gia tri ban dau: 2000
      duration: 300, //gia tri ban dau: 3000
      useNativeDriver: true,
    }).start();
  }, [appearAnim]);
  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateY: appearAnim.y }, { translateX: appearAnim.x }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const AppearInView = (props) => {
  const appearAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: 1,
      delay: 400, //gia tri ban dau: 4000
      duration: 100, //gia tri ban dau: 1000
      useNativeDriver: true,
    }).start();
  }, [appearAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: appearAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const Images = [
  require("../../../assets/hotels/Hotel-1.jpg"),
  require("../../../assets/hotels/noonHotel-1.jpg"),
  require("../../../assets/hotels/noonHotel-2.jpg"),
  require("../../../assets/hotels/noonHotel-3.jpg"),
  require("../../../assets/hotels/noonHotel-4.jpg"),
  require("../../../assets/hotels/darkHotel-1.jpg"),
  require("../../../assets/hotels/darkHotel-2.jpg"),
  require("../../../assets/hotels/darkHotel-3.jpg"),
  require("../../../assets/hotels/darkHotel-4.jpg"),
  require("../../../assets/hotels/Hotel-1.jpg"),
  require("../../../assets/hotels/Hotel-2.jpg"),
  require("../../../assets/hotels/Hotel-3.jpg"),
  require("../../../assets/hotels/Hotel-4.jpg"),
  require("../../../assets/hotels/noonHotel-1.jpg"),
  require("../../../assets/hotels/noonHotel-2.jpg"),
  require("../../../assets/hotels/noonHotel-3.jpg"),
  require("../../../assets/hotels/noonHotel-4.jpg"),
  require("../../../assets/hotels/darkHotel-1.jpg"),
  require("../../../assets/hotels/darkHotel-2.jpg"),
  require("../../../assets/hotels/darkHotel-3.jpg"),
  require("../../../assets/hotels/darkHotel-4.jpg"),
  require("../../../assets/hotels/Hotel-1.jpg"),
  require("../../../assets/hotels/Hotel-2.jpg"),
  require("../../../assets/hotels/Hotel-3.jpg"),
  require("../../../assets/hotels/Hotel-4.jpg"),
];

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const Start = () => {
  //   const [loading, setLoading] = useState(false);
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 3000);

  const _renderItem = ({ item, index }) => (
    <Image
      source={item}
      style={{
        width: deviceWidth / 4 - 4,
        height: ((deviceHeight / 14) * 8) / 3 - 4,
        margin: 4,
      }}
      resizeMode="cover"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppearInView style={styles.containerImage}>
        <FlatList data={Images} numColumns={8} renderItem={_renderItem} />
      </AppearInView>

      {/* (loading) && */}
      <AppearLogoInView style={styles.logo}>
        <View style={styles.logo}>
          <Image
            style={styles.imageLogo}
            source={require("../../../assets/logo.png")}
          />
        </View>
      </AppearLogoInView>

      <AppearInView style={{ flex: 1 }}>
        <View style={styles.containerText}>
          <Text style={styles.textAboveLogo}>Welcome to</Text>
        </View>
      </AppearInView>

      <AppearInView style={{ flex: 2 }}>
        <View style={styles.subText}>
          <Text>Feel the sensation of staying in a hotel cabin!</Text>
        </View>
      </AppearInView>

      {/* (loading) && */}
      <AppearInView
        style={{ flex: 2, justifyContent: "flex-end", paddingBottom: 30 }}
      >
        <TouchableOpacity>
          <Link
            to="/payment"
            style={styles.containerButton}
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#8078f5"
          >
            <Text style={styles.button}>Get started</Text>
          </Link>
        </TouchableOpacity>
      </AppearInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    width: 190 * 1.1,
    height: 67 * 1.1,
    background: "url(/images/logo.png)",
  },
  containerText: {
    flex: 1,
    position: "relative",
    top: 30,
    right: 95,
  },
  textAboveLogo: {
    fontSize: 30,
    fontWeight: "500",
  },
  containerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 9,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#7A71F7",
  },
  button: {
    fontSize: 17,
    lineHeight: 30,
    fontWeight: "light",
    color: "white",
  },

  containerImage: {
    flex: 8,
    display: "flex",
    flexDirection: "row",
    width: deviceWidth * 2,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "25deg" }],
    position: "relative",
    top: -110,
    right: -10,
  },
  images: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    margin: 2,
  },
  subText: {
    position: "relative",
    top: 95,
    right: 30,
  },
});

export default Start;
