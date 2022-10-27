import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

import { validator } from "../../Validator";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const [inforUser, setInforUser] = useState("");
  const [isCheckedHidePW, setIsCheckedHidePW] = useState(false);
  const [errorMessageFromServer, setErrorMessageFromServer] = useState("");
  const iconName = isCheckedHidePW ? "eye" : "eye-off";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePostData = async (data) => {
    try {
      const response = await fetch(
        "https://dream-hotelapp.herokuapp.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        }
      );
      const dataReturn = await response.json();
      console.log(dataReturn);
      if (dataReturn.error) {
        return dataReturn.error;
      } else {
        dispatch({ type: "ACCESS_TOKEN", payload: dataReturn.token });
        return undefined;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDataSubmit = async (e) => {
    e.persist();
    let infoOfUser;
    if (validator("email", email)) {
      setIsCheckEmail(validator("email", email));
    } else setIsCheckEmail(false);
    if (validator("password", password)) {
      setIsCheckPassword(validator("password", password));
    } else setIsCheckPassword(false);
    if (
      email &&
      password &&
      !validator("email", email) &&
      !validator("password", password)
    ) {
      infoOfUser = { email, password };
    }
    const errorMess = await handlePostData(infoOfUser);
    if (errorMess) setErrorMessageFromServer(errorMess);
    else navigate("/search", { replace: true });
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerTextHeader}>
          <Text style={styles.textHeader}>Sign in</Text>
          <Text style={styles.SubTextHeader}>Welcome, Sign in to continue</Text>
        </View>

        <View style={styles.containerForm}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={[
                styles.containerInput,
                {
                  borderColor:
                    isCheckEmail == "This field is required"
                      ? "red"
                      : "#e8e8e8",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="email-outline"
                color="gray"
                size={20}
              />
              <TextInput
                placeholder="Type your email"
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
          </View>

          <View style={{ flexDirection: "column" }}>
            <View
              style={[
                styles.containerInput,
                { justifyContent: "space-between" },
                {
                  borderColor:
                    isCheckPassword == "This field is required"
                      ? "red"
                      : "#e8e8e8",
                },
              ]}
            >
              <View style={styles.containerInputPw}>
                <Icon name="lock" color="gray" size={20} />
                <TextInput
                  keyboardType="default"
                  secureTextEntry={!isCheckedHidePW ? true : false}
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => {
                    setIsCheckPassword(false);
                    setPassword(e.nativeEvent.text);
                  }}
                  style={styles.pwInput}
                />
              </View>

              <Pressable onPress={() => setIsCheckedHidePW(!isCheckedHidePW)}>
                <Feather name={iconName} color="#B1B5C4" size={18} />
              </Pressable>
            </View>
            {isCheckPassword && isCheckPassword !== "This field is required" && (
              <View style={styles.containerTextError}>
                <Text style={styles.textError}>{isCheckPassword}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.containerButton}>
          <View style={styles.buttonForgotpw}>
            <TouchableOpacity>
              <Link
                to="/"
                component={TouchableHighlight}
                activeOpacity={0.7}
                underlayColor="#ffffff"
              >
                <Text style={styles.textForgotPw}>Forget password?</Text>
              </Link>
            </TouchableOpacity>
          </View>
          <Text style={[styles.text1, { color: "#000000", paddingBottom: 10 }]}>
            {errorMessageFromServer}
          </Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={(e) => {
              handleDataSubmit(e);
            }}
          >
            <Text style={styles.textButton}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerLine}>
          <View style={[styles.itemLine1, styles.line]}></View>
          <View style={styles.itemLine2}>
            <Text style={styles.textLine}>Or</Text>
          </View>
          <View style={[styles.itemLine3, styles.line]}></View>
        </View>

        <View style={styles.containerButtonLoginWith}>
          <TouchableOpacity style={styles.buttonLoginWith} activeOpacity={0.5}>
            <Icon name="google" style={styles.icon} size={20} />
            <Text style={styles.textIcon}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLoginWith} activeOpacity={0.5}>
            <Icon name="facebook" style={styles.icon} size={20} />
            <Text style={styles.textIcon}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerFooter}>
        <Text style={styles.textFooter}>Don't have account?</Text>

        <Link
          to="/register"
          style={styles.link}
          component={TouchableHighlight}
          activeOpacity={0.7}
          underlayColor="#ffffff"
        >
          <Text style={styles.textSignUp}> Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerHeader: {
    flex: 7,
    width: "100%",
  },
  containerTextHeader: {
    // flex: 2,
    paddingTop: 30,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 40,
  },
  SubTextHeader: {
    paddingTop: 15,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#777E91",
  },
  containerForm: {
    paddingTop: 30,
    paddingBottom: 15,
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
  containerInputPw: {
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 15,
  },
  emailInput: {
    paddingHorizontal: 10,
    maxWidth: deviceWidth - 130,
    flex: 1,
  },
  pwInput: {
    paddingHorizontal: 11,
    maxWidth: deviceWidth - 130,
    flex: 1,
  },
  containerTextError: {
    margin: 0,
  },
  textError: {
    color: "red",
    fontSize: 13,
  },
  containerButton: {
    // flex: 3,
    width: "100%",
    // marginTop: 50,
  },
  buttonForgotpw: {
    alignItems: "flex-end",
    paddingRight: 5,
  },
  textForgotPw: {
    color: "#7A71F7",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
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
  containerLine: {
    // flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingBottom: 20,
    // height: 20,
    paddingVertical: 50,
  },
  line: {
    width: deviceWidth / 2 - 45,
    height: 2,
    backgroundColor: "#E6E8EC",
    borderRadius: 44,
  },
  itemLine1: {
    order: 0,
    flexGrow: 0,
  },
  itemLine2: {
    order: 1,
    flexGrow: 0,
  },
  itemLine3: {
    order: 2,
    flexGrow: 0,
  },
  textLine: {
    color: "#B1B5C4",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  containerButtonLoginWith: {
    // flex: 1,
    padding: 0,
    width: "100%",
  },
  buttonLoginWith: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B1B5C4",
  },
  icon: {
    position: "relative",
    right: 90,
  },
  textIcon: {
    fontSize: 15,
    fontWeight: "300",
    color: "#777E91",
  },
  containerFooter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textFooter: {
    color: "#777E91",
    fontSize: 15,
  },
  textSignUp: {
    color: "#3888FE",
    fontWeight: "500",
  },
});
