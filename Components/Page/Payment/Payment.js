import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigate } from "react-router-native";
import { useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

import { validator } from "../../Validator";

let deviceWidth = Dimensions.get("window").width;

const Payment = () => {
  const data = useSelector((state) => state);
  const navigate = useNavigate();
  const handlePressBack = () => {
    navigate(-1);
  };
  const [state, setState] = useState(1);

  const [nameUser, setNameUSer] = useState(data.nameUser);
  const [errorName, setErrorName] = useState(false);
  const [phone, setPhone] = useState(data.phone);
  const [errorPhone, setErrorPhone] = useState(false);
  const laythang = (month) => {
    switch (month) {
      case 1:
        return "January ";
      case 2:
        return "February ";
      case 3:
        return "March ";
      case 4:
        return "April ";
      case 5:
        return "May ";
      case 6:
        return "June ";
      case 7:
        return "July ";
      case 8:
        return "August ";
      case 9:
        return "September ";
      case 10:
        return "October ";
      case 11:
        return "November ";
      case 12:
        return "December ";
    }
  };
  const idUSer = data.idUSer;
  const token = data.accessToken;
  const [numberCard, setNumberCard] = useState("");
  const [errorNumberCard, setErrorNumberCard] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [errorNameCard, setErrorNameCard] = useState(false);
  const [dateCard, setDateCard] = useState("");
  const [errorDateCard, setErrorDateCard] = useState(false);
  const [codeCard, setCodeCard] = useState("");
  const [errorCodeCard, setErrorCodeCard] = useState(false);
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
        if (data.bankCard) {
          const inforCard = data.bankCard.split(",");
          setNumberCard(inforCard[0]);
          setNameCard(inforCard[1]);
          setDateCard(inforCard[2]);
          setCodeCard(inforCard[3]);
        }
      });
  }, []);

  const handleProfile = () => {
    let errorProfile = false;
    if (validator("name", nameUser)) {
      errorProfile = true;
      setErrorName(validator("name", nameUser));
    }
    if (validator("phone", phone)) {
      errorProfile = true;
      setErrorPhone(validator("phone", phone));
    }
    return errorProfile;
  };

  const handleCredit = () => {
    let errorCredit = false;
    if (validator("numberCard", numberCard)) {
      errorCredit = true;
      setErrorNumberCard(validator("numberCard", numberCard));
    }
    if (validator("nameCard", nameCard)) {
      errorCredit = true;
      setErrorNameCard(validator("nameCard", nameCard));
    }
    if (validator("dateCard", dateCard)) {
      errorCredit = true;
      setErrorDateCard(validator("dateCard", dateCard));
    }
    if (validator("codeCard", codeCard)) {
      errorCredit = true;
      setErrorCodeCard(validator("codeCard", codeCard));
    }
    return errorCredit;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handlePressBack();
          }}
        >
          <Entypo name="chevron-left" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Payment</Text>
        <View style={{ width: 20 }}></View>
      </View>

      <View style={styles.main}>
        {state === 1 && (
          <View>
            <Text style={styles.largeText}>Billing Information</Text>
            <View style={styles.boxBillInfo}>
              <Text style={styles.nameHotel}>{data.nameHotel}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome5 name="bed" size={15} color="#7369FF" />
                <Text style={{ marginLeft: 10 }}>{data.typeRoom}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Feather name="clock" size={16} color="#7369FF" />
                <Text style={{ marginLeft: 10 }}>
                  {(data.checkOut - data.checkIn) / (24 * 3600 * 1000) +
                    1 +
                    " ngày, " +
                    (data.checkOut - data.checkIn) / (24 * 3600 * 1000) +
                    " đêm (" +
                    laythang(data.checkIn.getUTCMonth() + 1) +
                    data.checkIn.getUTCDate() +
                    " to " +
                    laythang(data.checkOut.getUTCMonth() + 1) +
                    data.checkOut.getUTCDate() +
                    ")"}
                </Text>
              </View>
              <Text style={styles.textIntoMoney}>Into money:</Text>
              <Text style={styles.textMoney}>
                {data.priceRoom *
                  ((data.checkOut - data.checkIn) / (24 * 3600 * 1000)) +
                  "$"}
              </Text>
            </View>
            <Text style={[styles.largeText, { marginBottom: 15 }]}>
              Contact Info
            </Text>
            <View style={styles.containerInput}>
              <TextInput
                value={nameUser}
                placeholder="Name"
                onChange={(e) => {
                  setNameUSer(e.nativeEvent.text);
                  setErrorName(false);
                }}
                style={styles.inputInfo}
              />
              {errorName && <Text style={styles.textError}> {errorName} </Text>}
            </View>
            <View style={styles.containerInput}>
              <TextInput
                value={phone}
                placeholder="Phone number"
                onChange={(e) => {
                  setPhone(e.nativeEvent.text);
                  setErrorPhone(false);
                }}
                style={styles.inputInfo}
              />
              {errorPhone && (
                <Text style={styles.textError}> {errorPhone} </Text>
              )}
            </View>
            <View style={styles.containerInput}>
              <TextInput value={data.email} editable={false} />
            </View>
          </View>
        )}
        {state === 2 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.titleInput}>Card number</Text>
            <TextInput
              value={numberCard}
              keyboardType="numeric"
              style={styles.inputCard}
              onChange={(e) => {
                if (
                  e.nativeEvent.text.split(" ").join("").length ==
                  numberCard.split(" ").join("").length
                )
                  e.nativeEvent.text = e.nativeEvent.text.slice(
                    0,
                    e.nativeEvent.text.length - 1
                  );
                if (
                  e.nativeEvent.text.split(" ").join("").length >
                    numberCard.split(" ").join("").length &&
                  e.nativeEvent.text.split(" ").join("").length != 0 &&
                  e.nativeEvent.text.split(" ").join("").length % 4 == 0
                ) {
                  e.nativeEvent.text += " ";
                }
                setErrorNumberCard(false);
                setNumberCard(e.nativeEvent.text);
              }}
            />
            {errorNumberCard && (
              <Text style={styles.textError}>{errorNumberCard} </Text>
            )}

            <Text style={styles.titleInput}>Name on card</Text>
            <TextInput
              value={nameCard}
              onChange={(e) => {
                setErrorNameCard(false);
                setNameCard(e.nativeEvent.text);
              }}
              style={styles.inputCard}
              autoCapitalize="characters"
            />
            {errorNameCard && (
              <Text style={styles.textError}>{errorNameCard} </Text>
            )}

            <View style={styles.inputCardBelow}>
              <View style={{ width: deviceWidth / 2 - 50 }}>
                <Text style={styles.titleInput}>Expiry date</Text>
                <TextInput
                  value={dateCard}
                  keyboardType="numeric"
                  maxLength={5}
                  onChange={(e) => {
                    if (
                      e.nativeEvent.text.split("/").join("").length ==
                      dateCard.split("/").join("").length
                    )
                      e.nativeEvent.text = e.nativeEvent.text.slice(
                        0,
                        e.nativeEvent.text.length - 1
                      );
                    if (e.nativeEvent.text.length == 2) {
                      e.nativeEvent.text += "/";
                    }
                    setErrorDateCard(false);
                    setDateCard(e.nativeEvent.text);
                  }}
                  style={styles.inputCard}
                />
                {errorDateCard && (
                  <Text style={styles.textError}>{errorDateCard} </Text>
                )}
              </View>
              <View style={{ width: deviceWidth / 2 - 50 }}>
                <Text style={styles.titleInput}>Security code</Text>
                <TextInput
                  value={codeCard}
                  keyboardType="numeric"
                  secureTextEntry={true}
                  maxLength={3}
                  onChange={(e) => {
                    setErrorCodeCard(false);
                    setCodeCard(e.nativeEvent.text);
                  }}
                  style={styles.inputCard}
                />
                {errorCodeCard && (
                  <Text style={styles.textError}>{errorCodeCard} </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={[styles.main, { marginTop: 20 }]}>
        <TouchableOpacity
          onPress={() => {
            if (state == 2) {
              if (!handleCredit())
                navigate("/statusbooking", { replace: true });
            }
            if (state == 1) {
              if (!handleProfile()) setState(state + 1);
            }
          }}
          style={styles.button}
          activeOpacity={0.9}
        >
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (state > 1) setState(state - 1);
          }}
          style={[
            styles.button,
            { backgroundColor: state == 1 ? "#DDDDDD" : "#7369FF" },
            { borderColor: state == 1 ? "#DDDDDD" : "#7369FF" },
          ]}
          activeOpacity={0.9}
          disabled={state == 1 ? true : false}
        >
          <Text style={styles.textButton}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
  },
  main: {
    paddingHorizontal: 20,
  },
  largeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  boxBillInfo: {
    borderColor: "#f0f0f0",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 15,
    backgroundColor: "#FCFCFD",
    shadowColor: "#d1d1d1",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  nameHotel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  textIntoMoney: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 8,
  },
  textMoney: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#7369FF",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#e8e8e8",
    height: 56,
    backgroundColor: "#FCFCFD",
    shadowColor: "#d1d1d1",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  inputInfo: {
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 17,
    borderRadius: 10,
    borderColor: "#7369FF",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#7369FF",
    marginBottom: 10,
  },
  textButton: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
  textError: {
    color: "red",
    marginRight: 15,
  },
  titleInput: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
    color: "#8C8C8C",
    marginBottom: 5,
  },
  inputCard: {
    width: "100%",
    borderColor: "#D9D9D9",
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
  },
  inputCardBelow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
