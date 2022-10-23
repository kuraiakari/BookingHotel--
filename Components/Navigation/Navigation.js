import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Link } from "react-router-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;


const Navigation = ({pathName}) => {
  let activeLink
  if (pathName === "/search" || pathName === "/listhotel") activeLink = [1,0,0,0]
  if (pathName === "/login") activeLink = [0,1,0,0]
  
  return (
    <View style={styles.tabNavigation}>
      <Link
        to="/search"
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
      >
        <View style={styles.elementNavigation}>
          <Feather 
            name="search" 
            size={20} 
            color={activeLink[0] === 1 ? "#7A71F7" : "#B1B5C4"} />
          <Text style={[
            styles.textElementNavigation, 
            { color:activeLink[0] === 1 ? "#7A71F7" : "#B1B5C4" }]}>Search</Text>
        </View>
      </Link>

      <Link
        to="/login"
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
      >
        <View style={styles.elementNavigation}>
          <MaterialCommunityIcons
            name="bag-checked"
            size={20}
            color={activeLink[1] === 1 ? "#7A71F7" : "#B1B5C4"} />
          <Text style={[
            styles.textElementNavigation,
            { color:activeLink[1] === 1 ? "#7A71F7" : "#B1B5C4" }]}>Order</Text>
        </View>
      </Link>

      <Link
        to="/register"
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
      >
        <View style={styles.elementNavigation}>
          <Ionicons name="md-heart-outline" size={20} color="#B1B5C4" />
          <Text style={styles.textElementNavigation}>Saved</Text>
        </View>
      </Link>

      <Link
        to="/"
        component={TouchableHighlight}
        activeOpacity={0.7}
        underlayColor="#ffffff"
      >
        <View style={styles.elementNavigation}>
          <Octicons name="person" size={20} color="#B1B5C4" />
          <Text style={styles.textElementNavigation}>Profile</Text>
        </View>
      </Link>
    </View>
  );
};
export default Navigation;

const styles = StyleSheet.create({
  tabNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 70,
    width: deviceWidth,
    marginTop: 5,
    paddingHorizontal: 30,
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "#000000",
    elevation: 15,
  },
  elementNavigation: {
    alignItems: "center",
    justifyContent: "center",
  },
  textElementNavigation: {
    color: "#B1B5C4",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 5,
  },
});
