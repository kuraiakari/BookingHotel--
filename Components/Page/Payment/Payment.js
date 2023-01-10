import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
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

import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

const Payment = () => {
  const data = useSelector((state) => state);
  const ngrok = data.linkNgrok
  const idUSer = data.idUSer;
  const token = data.accessToken;

  const navigate = useNavigate();
  const handlePressBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch(`${ngrok}/v1/user/id${idUSer}`, {
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

  const [nameUser, setNameUSer] = useState(data.nameUser);
  const [errorName, setErrorName] = useState(false);
  const [phone, setPhone] = useState(data.phone);
  const [errorPhone, setErrorPhone] = useState(false);
  const [numberCard, setNumberCard] = useState("");
  const [errorNumberCard, setErrorNumberCard] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [errorNameCard, setErrorNameCard] = useState(false);
  const [dateCard, setDateCard] = useState("");
  const [errorDateCard, setErrorDateCard] = useState(false);
  const [codeCard, setCodeCard] = useState("");
  const [errorCodeCard, setErrorCodeCard] = useState(false);
  const [checkError, setCheckError] = useState(false);

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

  const onNextStep = () => {
    if (validator("name", nameUser)) {
      setCheckError(true);
      setErrorName(validator("name", nameUser));
    }
    if (validator("phone", phone)) {
      setCheckError(true);
      setErrorPhone(validator("phone", phone));
    } else setCheckError(false);
  };

  const onPrevStep = () => {
    console.log("called previous step");
  };

  const onSubmitSteps = () => {
    let checkError = false;
    if (validator("numberCard", numberCard)) {
      setCheckError(true);
      setErrorNumberCard(validator("numberCard", numberCard));
      checkError = true;
    }
    if (validator("nameCard", nameCard)) {
      setCheckError(true);
      setErrorNameCard(validator("nameCard", nameCard));
      checkError = true;
    }
    if (validator("dateCard", dateCard)) {
      setCheckError(true);
      setErrorDateCard(validator("dateCard", dateCard));
      checkError = true;
    }
    if (validator("codeCard", codeCard)) {
      setCheckError(true);
      setErrorCodeCard(validator("codeCard", codeCard));
      checkError = true;
    }
    if (checkError) return;
    else {
      setCheckError(false);
      navigate("/statusbooking", { replace: true });
    }
  };

  const progressStepsStyle = {
    activeStepIconBorderColor: "#7369FF",
    activeStepNumColor: "white",
    activeStepIconColor: "#7369FF",
    completedStepIconColor: "#7369FF",
    completedProgressBarColor: "#7369FF",
    completedCheckColor: "white",
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
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

      <ProgressSteps {...progressStepsStyle}>
        <ProgressStep
          onNext={onNextStep}
          onPrevious={onPrevStep}
          errors={checkError}
        >
          <View style={styles.main}>
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
                      " days, " +
                      (data.checkOut - data.checkIn) / (24 * 3600 * 1000) +
                      " nights (" +
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
                {errorName && (
                  <Text style={styles.textError}> {errorName} </Text>
                )}
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
              <View style={[styles.containerInput, { paddingLeft: 20 }]}>
                <TextInput
                  value={data.email}
                  editable={false}
                  style={{ fontSize: 16 }}
                />
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep onPrevious={onPrevStep} onSubmit={onSubmitSteps}>
          <View style={styles.main}>
            <View style={styles.boxBillInfo}>
              <Text style={[styles.titleInput, { marginTop: 20 }]}>
                Card number
              </Text>
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
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
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
    height: 480,
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
  animeBlock: {
    padding: 4,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  animeButtonBig: {
    borderRadius: 50,
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  animeLine: {
    height: 2,
    width: 90,
  },
  animeButtonSmail: {
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "white",
    height: 15,
    width: 15,
    backgroundColor: "#7369FF",
  },
});
