import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigate } from "react-router-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";
import { validator } from "../../Validator";
let deviceWidth = Dimensions.get("window").width;
const ChangePassword = () => {
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state);
  const idUSer =inforUser.idUSer;
  const token = inforUser.accessToken;
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);
  function onSwipeLeft() {}
  function onSwipeRight() {
    navigate(-1);
  }
  const [oldData, setOldData] = useState("");
  const [newData, setNewData] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCheckCurrentPassword, setIsCheckCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isCheckNewPassword, setIsCheckNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCheckConfirmNewPassword, setIsCheckConfirmNewPassword] =
    useState(false);
  const [isCheckedHideOPW, setIsCheckedHideOPW] = useState(false);
  const iconNameOPW = isCheckedHideOPW ? "eye" : "eye-off";
  const [isCheckedHideNPW, setIsCheckedHideNPW] = useState(false);
  const iconNameNPW = isCheckedHideNPW ? "eye" : "eye-off";
  const [isCheckedHideCNPW, setIsCheckedHideCNPW] = useState(false);
  const iconNameCNPW = isCheckedHideCNPW ? "eye" : "eye-off";
  // console.log(token)
  useEffect(() => {
    fetch(`https://dream-hotelapp.herokuapp.com/v1/user/id${idUSer}`, {
      method: "GET",
      credentials: "included",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOldData(data);
      });
  }, [newData]);
  const handleSubmit = () => {
    if (validator("password", currentPassword))
      setIsCheckCurrentPassword(validator("password", currentPassword));
    else {
      if (validator("confirmpassword", currentPassword, oldData.password))
        setIsCheckCurrentPassword(
          validator("confirmpassword", currentPassword, oldData.password)
        );
      else setIsCheckCurrentPassword(false);
    }
    if (validator("password", newPassword))
      setIsCheckNewPassword(validator("password", newPassword));
    else {
      if (validator("confirmoldpassword", newPassword, oldData.password))
        setIsCheckNewPassword(
          validator("confirmoldpassword", newPassword, oldData.password)
        );
      else setIsCheckNewPassword(false);
    }
    if (validator("confirmpassword", confirmNewPassword, newPassword)){
      setIsCheckConfirmNewPassword(
        validator("confirmpassword", confirmNewPassword, newPassword)
      );
    }
    else setIsCheckConfirmNewPassword(false);
    //khởi tạo object data
    if (
      currentPassword &&
      newPassword &&
      confirmNewPassword &&
      !validator("password", currentPassword) &&
      !validator("password", newPassword) &&
      !validator("confirmpassword", confirmNewPassword, newPassword) &&
      !validator("confirmpassword", currentPassword, oldData.password) &&
      !validator("confirmoldpassword", newPassword, currentPassword)
    ) {
      const newDataCreate = {
        password: newPassword,
      };
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      fetch(`https://dream-hotelapp.herokuapp.com/v1/user/update/id${idUSer}`, {
        method: "PUT",
        credentials: "included",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${token}`,
        },
        body: JSON.stringify(newDataCreate),
      })
        .then((response) => response.json())
        .then((data) => {
          setNewData(newDataCreate)
        });
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
        <Text style={styles.textHeader}>Change password</Text>
        <View style={{ width: 40 }}></View>
      </View>

      <Text style={styles.textEdit}>Current password</Text>
      <View
        style={[
          styles.containerInput,
          { justifyContent: "space-between" },
          {
            borderColor:
              isCheckCurrentPassword == "This field is required"
                ? "red"
                : "#e8e8e8",
          },
        ]}
      >
        <View style={styles.containerInputPw}>
          <Icon name="lock" color="gray" size={20} />
          <TextInput
            keyboardType="default"
            secureTextEntry={!isCheckedHideOPW ? true : false}
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => {
              setIsCheckCurrentPassword(false);
              setCurrentPassword(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        <Pressable onPress={() => setIsCheckedHideOPW(!isCheckedHideOPW)}>
          <Feather name={iconNameOPW} color="#B1B5C4" size={18} />
        </Pressable>
      </View>
      {isCheckCurrentPassword &&
        isCheckCurrentPassword !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckCurrentPassword}</Text>
          </View>
        )}

      <Text style={styles.textEdit}>New password</Text>
      <View
        style={[
          styles.containerInput,
          { justifyContent: "space-between" },
          {
            borderColor:
              isCheckNewPassword == "This field is required"
                ? "red"
                : "#e8e8e8",
          },
        ]}
      >
        <View style={styles.containerInputPw}>
          <Icon name="lock" color="gray" size={20} />
          <TextInput
            keyboardType="default"
            secureTextEntry={!isCheckedHideNPW ? true : false}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setIsCheckNewPassword(false);
              setNewPassword(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        <Pressable onPress={() => setIsCheckedHideNPW(!isCheckedHideNPW)}>
          <Feather name={iconNameNPW} color="#B1B5C4" size={18} />
        </Pressable>
      </View>
      {isCheckNewPassword && isCheckNewPassword !== "This field is required" && (
        <View style={styles.containerTextError}>
          <Text style={styles.textError}>{isCheckNewPassword}</Text>
        </View>
      )}

      <Text style={styles.textEdit}>Confirm new password</Text>
      <View
        style={[
          styles.containerInput,
          { justifyContent: "space-between" },
          {
            borderColor:
              isCheckConfirmNewPassword == "This field is required"
                ? "red"
                : "#e8e8e8",
          },
        ]}
      >
        <View style={styles.containerInputPw}>
          <Icon name="lock" color="gray" size={20} />
          <TextInput
            keyboardType="default"
            secureTextEntry={!isCheckedHideCNPW ? true : false}
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => {
              setIsCheckConfirmNewPassword(false);
              setConfirmNewPassword(e.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        <Pressable onPress={() => setIsCheckedHideCNPW(!isCheckedHideCNPW)}>
          <Feather name={iconNameCNPW} color="#B1B5C4" size={18} />
        </Pressable>
      </View>
      {isCheckConfirmNewPassword &&
        isCheckConfirmNewPassword !== "This field is required" && (
          <View style={styles.containerTextError}>
            <Text style={styles.textError}>{isCheckConfirmNewPassword}</Text>
          </View>
        )}

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.textButton}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ChangePassword;

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
    marginBottom: 20,
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
  containerInputPw: {
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 15,
  },
});