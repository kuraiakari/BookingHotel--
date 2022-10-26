import React from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Link, useLocation } from "react-router-native";

import Navigation from "../../Navigation/Navigation";

const PersonalDetails = () => {
  const location = useLocation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Personal details</Text>
      <View>
        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} />
        <View>
          <Text>Username</Text>
          <Text>@username</Text>
        </View>
      </View>
      <View>
        <Link to="/person/editprofile">
          <Text>Edit Profile</Text>
        </Link>
        <Link to="/person/changepassword">
          <Text>Change password</Text>
        </Link>
        <Link>
          <Text>Order</Text>
        </Link>
        <Link>
          <Text>Like hotel</Text>
        </Link>
        <Link>
          <Text>Credit</Text>
        </Link>
        <Link>
          <Text>Help</Text>
        </Link>
        <Link>
          <Text>Log out</Text>
        </Link>
      </View>
      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};
export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
