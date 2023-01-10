import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigate } from "react-router-native";
import { useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";

import { validator } from "../../Validator";

let deviceWidth = Dimensions.get("window").width;

const Credit = () => {
  const inforUser = useSelector((state) => state);
  const ngrok = inforUser.linkNgrok;
  const idUSer = inforUser.idUSer;
  const token = inforUser.accessToken;
  const [numberCard, setNumberCard] = useState("");
  const [errorNumberCard, setErrorNumberCard] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [errorNameCard, setErrorNameCard] = useState(false);
  const [dateCard, setDateCard] = useState("");
  const [errorDateCard, setErrorDateCard] = useState(false);
  const [codeCard, setCodeCard] = useState("");
  const [errorCodeCard, setErrorCodeCard] = useState(false);

  const navigate = useNavigate();

  const handleCredit = () => {
    if (validator("numberCard", numberCard))
      setErrorNumberCard(validator("numberCard", numberCard));
    if (validator("nameCard", nameCard))
      setErrorNameCard(validator("nameCard", nameCard));
    if (validator("dateCard", dateCard))
      setErrorDateCard(validator("dateCard", dateCard));
    if (validator("codeCard", codeCard))
      setErrorCodeCard(validator("codeCard", codeCard));
    if (
      numberCard &&
      nameCard &&
      dateCard &&
      codeCard &&
      !validator("numberCard", numberCard) &&
      !validator("nameCard", nameCard) &&
      !validator("dateCard", dateCard) &&
      !validator("codeCard", codeCard)
    ) {
      const dataCredit = {
        bankCard: `${numberCard.trim()},${nameCard},${dateCard},${codeCard}`,
      };
      //   console.log(dataCredit);
      fetch(`${ngrok}/v1/user/update/id${idUSer}`, {
        method: "PUT",
        credentials: "included",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${token}`,
        },
        body: JSON.stringify(dataCredit),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Update successful");
        });
    } else {
      alert("Wrong information");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Entypo name="chevron-left" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Credit card</Text>
        <View style={{ width: 20 }}></View>
      </View>

      <View>
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
          style={styles.inputCard}
          onChange={(e) => {
            setErrorNameCard(false);
            setNameCard(e.nativeEvent.text);
          }}
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
              style={styles.inputCard}
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
              style={styles.inputCard}
              onChange={(e) => {
                setErrorCodeCard(false);
                setCodeCard(e.nativeEvent.text);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            handleCredit();
          }}
        >
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Credit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 40,
  },
  textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
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
  containerButton: {
    position: "absolute",
    bottom: 15,
    right: 0,
    left: 0,
  },
  textError: {
    color: "red",
    marginRight: 15,
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
