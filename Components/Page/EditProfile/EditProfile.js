import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigate } from "react-router-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";
import { validator } from "../../Validator";

let deviceWidth = Dimensions.get("window").width;

const EditProfile = () => {
  const navigate = useNavigate();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);
  function onSwipeLeft() {}
  function onSwipeRight() {
    navigate(-1);
  }

  const [email, setEmail] = useState("");
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [isCheckPhone, setIsCheckPhone] = useState(false);

  const handleSubmit = () => {
    if (validator("email", email)) setIsCheckEmail(validator("email", email));
    else setIsCheckEmail(false);
    if (validator("phone", phone)) setIsCheckPhone(validator("phone", phone));
    else setIsCheckPhone(false);
    //khởi tạo object data
  };

  return (
    <SafeAreaView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Edit profile</Text>
        <View></View>
      </View>

      <Text>Email</Text>
      <View
        style={[
          styles.containerInput,
          {
            borderColor:
              isCheckEmail == "This field is required" ? "red" : "#e8e8e8",
          },
        ]}
      >
        <MaterialCommunityIcons name="email-outline" color="gray" size={20} />
        <TextInput
          placeholder="Examplefilledmail@gmail.com"
          value={email}
          onChange={(e) => {
            setIsCheckEmail(false);
            setEmail(e.nativeEvent.text);
          }}
          style={styles.emailInput}
        />
      </View>
      {isCheckEmail && isCheckEmail !== "This field is required" && (
        <View style={styles.containerTextError}>
          <Text style={styles.textError}>{isCheckEmail}</Text>
        </View>
      )}

      <Text>Telephone number</Text>
      <View
        style={[
          styles.containerInput,
          {
            borderColor:
              isCheckPhone == "This field is required" ? "red" : "#e8e8e8",
          },
        ]}
      >
        <MaterialCommunityIcons
          name="email-outline" //sửa tên icon phone
          color="gray"
          size={20}
        />
        <TextInput
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => {
            setIsCheckPhone(false);
            setPhone(e.nativeEvent.text);
          }}
          style={styles.emailInput}
        />
      </View>
      {isCheckPhone && isCheckPhone !== "This field is required" && (
        <View style={styles.containerTextError}>
          <Text style={styles.textError}>{isCheckPhone}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e8e8e8",
    height: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  emailInput: {
    paddingHorizontal: 10,
    maxWidth: deviceWidth - 130,
    flex: 1,
  },
  containerTextError: {
    // margin: 0,
  },
  textError: {
    color: "red",
    fontSize: 13,
  },
  containerButton: {
    // height: deviceHeight * (0.65) * 0.333,
    width: "100%",
    // marginTop: 50,
    // paddingTop: 30,
  },
  checkTerm: {
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 35
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#7A71F7",
    marginTop: 40,
  },
  textButton: {
    fontSize: 17,
    lineHeight: 30,
    fontWeight: "light",
    color: "white",
  },
});
