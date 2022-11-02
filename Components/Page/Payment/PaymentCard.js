import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { validator } from "../../Validator";

const PaymentCard = () => {
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state);
  const idUSer = inforUser.idUSer;
  const token = inforUser.accessToken;
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
  const [numberCard, setNumberCard] = useState("");
  const [errorNumberCard, setErrorNumberCard] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [errorNameCard, setErrorNameCard] = useState(false);
  const [dateCard, setDateCard] = useState("");
  const [errorDateCard, setErrorDateCard] = useState(false);
  const [codeCard, setCodeCard] = useState("");
  const [errorCodeCard, setErrorCodeCard] = useState(false);
  const data = `${numberCard.trim()},${nameCard},${dateCard},${codeCard}`;
  console.log(data)
  useEffect(() => {
      dispatch({
        type: "CREDIT",
        payload: `${numberCard.trim()},${nameCard},${dateCard},${codeCard}`,
      });
  }, [data]);
  return (
    <View>
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
    </View>
  );
};
export default PaymentCard;
