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
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";
import { validator } from "../../Validator";

let deviceWidth = Dimensions.get("window").width;

const EditProfile = () => {
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state);
  const dispatch = useDispatch();
  const idUSer = inforUser.idUSer;
  const token = inforUser.accessToken;
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);
  function onSwipeLeft() {}
  function onSwipeRight() {
    navigate(-1);
  }
  const [firstName, setFirstName] = useState("");
  const [isCheckFirstName, setIsCheckFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [isCheckLastName, setIsCheckLastName] = useState(false);
  const [gender, setGender] = useState("");
  const [isCheckGender, setIsCheckGender] = useState(false);
  const [phone, setPhone] = useState("");
  const [isCheckPhone, setIsCheckPhone] = useState(false);
  const [nationality, setNationality] = useState("");
  const [isCheckNationality, setIsCheckNationality] = useState(false);

  const handleSubmit = () => {
    if (validator("firstName", firstName))
      setIsCheckFirstName(validator("firstName", firstName));
    else setIsCheckFirstName(false);
    if (validator("lastName", lastName))
      setIsCheckLastName(validator("lastName", lastName));
    else setIsCheckLastName(false);
    if (validator("gender", gender))
      setIsCheckGender(validator("gender", gender));
    else setIsCheckGender(false);
    if (validator("phone", phone)) setIsCheckPhone(validator("phone", phone));
    else setIsCheckPhone(false);
    if (validator("nationality", nationality))
      setIsCheckNationality(validator("nationality", nationality));
    else setIsCheckNationality(false);
    //khởi tạo object data

    if (
      firstName &&
      lastName &&
      gender &&
      phone &&
      nationality &&
      !validator("firstName", firstName) &&
      !validator("lastName", lastName) &&
      !validator("gender", gender) &&
      !validator("phone", phone) &&
      !validator("nationality", nationality)
    ) {
      const dataInfor = {
        firstName,
        lastName,
        gender,
        phone,
        nationality,
      };
      dispatch({ type: "NAME_USER", payload: firstName + " " + lastName });
      dispatch({ type: "PHONE", payload: phone });
      fetch(`https://dream-hotelapp.herokuapp.com/v1/user/update/id${idUSer}`, {
        method: "PUT",
        credentials: "included",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${token}`,
        },
        body: JSON.stringify(dataInfor),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully edited profile");
        });
      setFirstName("");
      setLastName("");
      setGender("");
      setPhone("");
      setNationality("");
    }
  };

  return (
    <SafeAreaView
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Edit profile</Text>
        <View style={{ width: 60 }}></View>
      </View>

      <View>
        {/* <Text style={styles.textEdit}>First name</Text> */}
        <View
          style={[
            styles.containerInput,
            {
              borderColor:
                isCheckFirstName == "This field is required"
                  ? "red"
                  : "#e8e8e8",
            },
          ]}
        >
          <MaterialCommunityIcons name="account" color="gray" size={20} />
          <TextInput
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setIsCheckFirstName(false);
              setFirstName(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        {isCheckFirstName && isCheckFirstName !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckFirstName}</Text>
          </View>
        )}
      </View>

      <View>
        {/* <Text style={styles.textEdit}>Last name</Text> */}
        <View
          style={[
            styles.containerInput,
            {
              borderColor:
                isCheckLastName == "This field is required" ? "red" : "#e8e8e8",
            },
          ]}
        >
          <MaterialCommunityIcons name="account" color="gray" size={20} />
          <TextInput
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setIsCheckLastName(false);
              setLastName(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        {isCheckLastName && isCheckLastName !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckLastName}</Text>
          </View>
        )}
      </View>

      <View>
        {/* <Text style={styles.textEdit}>Gender</Text> */}
        <View
          style={[
            styles.containerInput,
            {
              borderColor:
                isCheckGender == "This field is required" ? "red" : "#e8e8e8",
            },
          ]}
        >
          <Icon name="genderless" color="gray" size={20} />
          <TextInput
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
              setIsCheckGender(false);
              setGender(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        {isCheckGender && isCheckGender !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckGender}</Text>
          </View>
        )}
      </View>

      <View>
        {/* <Text style={styles.textEdit}>Phone number</Text> */}
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
            name="cellphone" //sửa tên icon phone
            color="gray"
            size={20}
          />
          <TextInput
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              setIsCheckPhone(false);
              setPhone(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        {isCheckPhone && isCheckPhone !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckPhone}</Text>
          </View>
        )}
      </View>

      <View>
        {/* <Text style={styles.textEdit}>Nationality</Text> */}
        <View
          style={[
            styles.containerInput,
            {
              borderColor:
                isCheckNationality == "This field is required"
                  ? "red"
                  : "#e8e8e8",
            },
          ]}
        >
          <MaterialCommunityIcons
            name="flag" //sửa tên icon phone
            color="gray"
            size={20}
          />
          <TextInput
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => {
              setIsCheckNationality(false);
              setNationality(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        {isCheckNationality && isCheckNationality !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckNationality}</Text>
          </View>
        )}
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#e8e8e8",
    height: 60,
    backgroundColor: "#FCFCFD",
    shadowColor: "#d1d1d1",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    marginBottom: 30,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  textEdit: {
    color: "#777E91",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    paddingLeft: 10,
    maxWidth: deviceWidth - 80,
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
    position: "absolute",
    bottom: 15,
    right: 0,
    left: 0,
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
