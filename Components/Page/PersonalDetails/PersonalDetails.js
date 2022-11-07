import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Link, useLocation } from "react-router-native";
import { useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

import Navigation from "../../Navigation/Navigation";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const PersonalDetails = () => {
  const location = useLocation();
  const inforUser = useSelector((state) => state);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Personal details</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.avatarName}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/young-black-girl-avatar_53876-115570.jpg?w=826&t=st=1667035990~exp=1667036590~hmac=9f9b0a4084811d1196249bd030be5a5822bf5ed2b4d429e4a1d782a2f81ad783",
            }}
            style={styles.avatar}
          />
          <View style={styles.names}>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={styles.userName}>{inforUser.nameUser || "Username"} </Text>
              <AntDesign name="checkcircle" size={20} color="green" />
            </View>
          </View>
        </View>
        <View style={styles.listInfo}>
          <Link
            to="/person/editprofile"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
          >
            <View style={styles.elementInfo}>
              <Text style={styles.elementText}>Edit Profile</Text>
              <Entypo name="chevron-right" size={20} color="#777E91" />
            </View>
          </Link>
          <Link
            to="/person/changepassword"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
          >
            <View style={styles.elementInfo}>
              <Text style={styles.elementText}>Change password</Text>
              <Entypo name="chevron-right" size={20} color="#777E91" />
            </View>
          </Link>
          <Link
            to="/person/credit"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
          >
            <View style={styles.elementInfo}>
              <Text style={styles.elementText}>Credit</Text>
              <Entypo name="chevron-right" size={20} color="#777E91" />
            </View>
          </Link>
          <Link
            to="/person/support"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
          >
            <View style={styles.elementInfo}>
              <Text style={styles.elementText}>Support</Text>
              <Entypo name="chevron-right" size={20} color="#777E91" />
            </View>
          </Link>
          <Link
            to="/login"
            component={TouchableHighlight}
            activeOpacity={0.7}
            underlayColor="#ffffff"
          >
            <View style={styles.elementInfo}>
              <Text style={styles.elementText}>Log out</Text>
              <Entypo name="chevron-right" size={20} color="#777E91" />
            </View>
          </Link>
        </View>
      </View>

      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};
export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  mainContainer: {
    paddingHorizontal: 30,
    width: "100%",
  },
  avatarName: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 25,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  names: {
    paddingLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 10,
  },
  listInfo: {},
  elementInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  elementText: {
    color: "#777E91",
    fontSize: 14,
    fontWeight: "500",
  },
});
