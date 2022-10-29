import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Link, BackButton, useLocation } from "react-router-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Evillcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";

import { validator } from "../../Validator";
import Navigation from "../../Navigation/Navigation";

// Đã có validator thời gian checkin checkout

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const Search = () => {
  const [city, setCiTy] = useState("");
  const [isCheckCity, setIsCheckCity] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [hideCheckIn, setHideCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(null);
  const [hideCheckOut, setHideCheckOut] = useState(false);
  const [numberAdults, setNumberAdults] = useState(0);
  const [isCheckAdults, setIsCheckAdults] = useState(false);
  const [numberChildrens, setNumberChildrens] = useState(0);
  const [isCheckChildrens, setIsCheckChildrens] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const handleSearching = (e) => {
    const checkError = false;
    if (city.trim() === "") {
      e.preventDefault();
      setIsCheckCity(true);
      checkError = true;
    }
    if (!checkIn) {
      e.preventDefault();
      setCheckIn("");
      checkError = true;
    }
    if (!checkOut) {
      e.preventDefault();
      setCheckOut("");
      checkError = true;
    }
    if (numberAdults === 0) {
      e.preventDefault();
      setIsCheckAdults(true);
      checkError = true;
    }
    if (numberChildrens === 0) {
      e.preventDefault();
      setIsCheckChildrens(true);
      checkError = true;
    }
    if (checkError) return;
    dispatch({ type: "SERACH_NAME_CITY", payload: city.trim() });
    dispatch({ type: "CHECK_IN", payload: checkIn });
    dispatch({ type: "CHECK_OUT", payload: checkOut });
    dispatch({ type: "NUMBER_ADULTS", payload: numberAdults });
    dispatch({ type: "NUMBER_CHILDRENS", payload: numberChildrens });
  };

  const showDatePickerCheckIn = () => {
    setHideCheckIn(true);
  };
  const hideDatePickerCheckIn = () => {
    setHideCheckIn(false);
  };
  const handleConfirmCheckIn = (date) => {
    const errorMessage = validator("checkIn", date);
    if (!errorMessage) setCheckIn(date);
    else alert(errorMessage);
    hideDatePickerCheckIn();
  };

  const showDatePickerCheckOut = () => {
    setHideCheckOut(true);
  };
  const hideDatePickerCheckOut = () => {
    setHideCheckOut(false);
  };
  const handleConfirmCheckOut = (date) => {
    const errorMessage = validator("checkOut", date, checkIn);
    if (!errorMessage) setCheckOut(date);
    else alert(errorMessage);
    hideDatePickerCheckOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Feather name="bell" size={20} color="#7369FF" />
      </View>

      <View style={styles.centerContainer}>
        <Image
          source={require("../../../assets/hotels/Hotel-3.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        />
        <View style={styles.texts}>
          <Text style={styles.largeText}>Fresh, quiet and peaceful.</Text>
          <Text style={styles.smallText}>
            Feel the sensation of staying in a hotel cabin
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputCity}>
          <Text style={styles.textOrder}>City, destination or appartment</Text>
          <View
            style={[
              styles.boxInput,
              {
                borderColor: isCheckCity ? "red" : "#CCCCCC",
              },
            ]}
          >
            <TextInput
              value={city}
              placeholder="City"
              onChange={(e) => {
                setIsCheckCity(false);
                setCiTy(e.nativeEvent.text);
              }}
              style={{ flex: 1 }}
            />
            <Evillcons name="location" color="#7369FF" size={25} />
          </View>
        </View>

        <View style={styles.boxOrder}>
          <View style={styles.checkIn}>
            <Text style={styles.textOrder}>Check In</Text>
            <Pressable onPress={showDatePickerCheckIn}>
              <View
                style={[
                  styles.boxInput,
                  {
                    borderColor: checkIn === "" ? "red" : "#CCCCCC",
                  },
                ]}
              >
                <TextInput
                  pointerEvents="none"
                  editable={false}
                  placeholder="yyyy/mm/dd"
                  value={
                    checkIn
                      ? `${checkIn.getUTCFullYear()}/${
                          checkIn.getUTCMonth() + 1
                        }/${checkIn.getUTCDate()}`
                      : ""
                  }
                  style={{ flex: 1 }}
                />
                <Icon name="calendar" color="#7369FF" size={20} />
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={hideCheckIn}
              mode="date"
              onConfirm={handleConfirmCheckIn}
              onCancel={hideDatePickerCheckIn}
            />
          </View>

          <View style={styles.checkOut}>
            <Text style={styles.textOrder}>Check Out</Text>
            <Pressable onPress={showDatePickerCheckOut}>
              <View
                style={[
                  styles.boxInput,
                  {
                    borderColor: checkOut === "" ? "red" : "#CCCCCC",
                  },
                ]}
              >
                <TextInput
                  pointerEvents="none"
                  editable={false}
                  placeholder="yyyy/mm/dd"
                  value={
                    checkOut
                      ? `${checkOut.getUTCFullYear()}/${
                          checkOut.getUTCMonth() + 1
                        }/${checkOut.getUTCDate()}`
                      : ""
                  }
                  style={{ flex: 1 }}
                />
                <Icon name="calendar" color="#7369FF" size={20} />
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={hideCheckOut}
              mode="date"
              onConfirm={handleConfirmCheckOut}
              onCancel={hideDatePickerCheckOut}
            />
          </View>
        </View>

        <View style={styles.boxGuests}>
          <Text style={styles.textOrder}>Guest and rooms</Text>
          <View
            style={[
              styles.boxGuest,
              styles.boxGuestSpace,
              { paddingBottom: 10 },
            ]}
          >
            <View
              style={[
                styles.boxGuest,
                styles.boxShowGuest,
                {
                  borderColor: isCheckAdults ? "red" : "#CCCCCC",
                },
              ]}
            >
              <Octicons name="person" color="#7369FF" size={20} />
              <Text style={styles.textForGuest}>18+ years old</Text>
            </View>
            <View style={[styles.boxGuest, styles.boxBtnPlusMinus]}>
              <TouchableOpacity
                onPress={() => {
                  setIsCheckAdults(false);
                  setNumberAdults(numberAdults + 1);
                }}
              >
                <Feather name="plus-circle" color="#7369FF" size={25} />
              </TouchableOpacity>
              <TextInput
                keyboardType="numeric"
                value={`${numberAdults}`}
                onChange={(e) => {
                  setIsCheckAdults(false);
                  setNumberAdults(e.nativeEvent.text);
                }}
              />
              <TouchableOpacity
                disabled={numberAdults > 0 ? false : true}
                onPress={() => {
                  setIsCheckAdults(false);
                  setNumberAdults(numberAdults - 1);
                }}
              >
                <Feather name="minus-circle" color="#7369FF" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.boxGuest, styles.boxGuestSpace]}>
            <View
              style={[
                styles.boxGuest,
                styles.boxShowGuest,
                {
                  borderColor: isCheckChildrens ? "red" : "#CCCCCC",
                },
              ]}
            >
              <Octicons name="person" color="#7369FF" size={25} />
              <Text style={styles.textForGuest}>0 to 17 years old</Text>
            </View>
            <View style={[styles.boxGuest, styles.boxBtnPlusMinus]}>
              <TouchableOpacity
                onPress={() => {
                  setIsCheckChildrens(false);
                  setNumberChildrens(numberChildrens + 1);
                }}
              >
                <Feather name="plus-circle" color="#7369FF" size={25} />
              </TouchableOpacity>
              <TextInput
                keyboardType="numeric"
                value={`${numberChildrens}`}
                onChange={(e) => {
                  setIsCheckChildrens(false);
                  setNumberChildrens(e.nativeEvent.text);
                }}
              />
              <TouchableOpacity
                disabled={numberChildrens > 0 ? false : true}
                onPress={() => {
                  setIsCheckChildrens(false);
                  setNumberChildrens(numberChildrens - 1);
                }}
              >
                <Feather name="minus-circle" color="#7369FF" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Link
          to="/listhotel"
          component={TouchableHighlight}
          activeOpacity={0.7}
          underlayColor="#8078f5"
          onPress={(e) => {
            handleSearching(e);
          }}
          style={styles.button}
        >
          <Text style={styles.textButton}>Search</Text>
        </Link>
        {/* Có bug input bị trống */}
      </View>
      <Navigation pathName={location.pathname} />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  logo: {
    height: 67 * 0.55,
    width: 190 * 0.55,
  },
  centerContainer: {
    // flex: 3,
    paddingTop: 10,
    paddingBottom: 20,
  },
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight * 0.27,
    backgroundColor: "transparent",
    opacity: 0.4,
  },
  texts: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  largeText: {
    fontSize: 51,
    fontWeight: "700",
    lineHeight: 56,
    paddingBottom: 15,
  },
  smallText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    width: 287,
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  inputCity: {
    paddingBottom: 20,
  },
  textOrder: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16,
    paddingBottom: 10,
  },
  boxInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 16,
  },
  boxOrder: {
    flexDirection: "row",
    paddingBottom: 20,
    alignItems: "center",
  },
  checkIn: {
    flex: 1,
  },
  checkOut: {
    flex: 1,
    paddingLeft: 30,
  },
  boxDate: {
    flexDirection: "row",
  },
  boxGuests: {
    paddingBottom: 20,
  },
  boxGuest: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxShowGuest: {
    paddingHorizontal: 15,
    width: (deviceWidth - 60) * 0.7,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 16,
  },
  boxGuestSpace: {
    justifyContent: "space-between",
  },
  textForGuest: {
    paddingLeft: 45,
    color: "#A9ADB9",
  },
  boxBtnPlusMinus: {
    width: (deviceWidth - 60) * 0.2,
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 16,
    width: "100%",
    backgroundColor: "#7A71F7",
  },
  textButton: {
    fontSize: 17,
    lineHeight: 30,
    fontWeight: "light",
    color: "white",
  },
});
