import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { validator } from "../../Validator";

const Credit = () => {
  const inforUser = useSelector((state) => state);
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
      fetch(`https://dream-hotelapp.herokuapp.com/v1/user/update/id${idUSer}`, {
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
          console.log(data);
        });
    } else {
      console.log(1);
    }
  };
  return (
    <View style={{ marginTop: 40 }}>
      <View>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
        </TouchableOpacity>
      </View>
      <Text>Card number</Text>
      <TextInput
        value={numberCard}
        keyboardType="numeric"
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
      <Text>Name on card</Text>
      <TextInput
        value={nameCard}
        onChange={(e) => {
          setErrorNameCard(false);
          setNameCard(e.nativeEvent.text);
        }}
      />
      <Text>Expiry date</Text>
      <TextInput
        value={dateCard}
        keyboardType="numeric"
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
      <Text>Security code</Text>
      <TextInput
        value={codeCard}
        keyboardType="numeric"
        onChange={(e) => {
          setErrorCodeCard(false);
          setCodeCard(e.nativeEvent.text);
        }}
      />
      <Button title="Save" onPress={() => handleCredit()} />
    </View>
  );
};
export default Credit;
