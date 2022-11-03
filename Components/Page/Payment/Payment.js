import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import { useSelector, useDispatch } from "react-redux";

import { validator } from "../../Validator";

const Payment = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePressBack = () => {
    navigate(-1);
  };
  const [state, setState] = useState(1);

  const [nameUser, setNameUSer] = useState(data.nameUser);
  const [phone, setPhone] = useState(data.phone);
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
  console.log(data)
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
  const handleCredit = () => {
    console.log(1)
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
      dispatch({
        type: "CREDIT",
        payload: `${numberCard.trim()},${nameCard},${dateCard},${codeCard}`,
      });
      navigate("/search", { replace: true });
    }
  };
  return (
    <View style={{ marginTop: 40 }}>
      <Button
        title="Back"
        onPress={() => {
          handlePressBack();
        }}
      />
      <View style={{ height: 300 }}>
        {state === 1 && (
          <View>
            <Text>Billing Information</Text>
            <Text>{data.nameHotel}</Text>
            <Text>{data.typeRoom}</Text>
            <Text>
              {(data.checkOut - data.checkIn) / (24 * 3600 * 1000) +
                1 +
                " ngày, " +
                (data.checkOut - data.checkIn) / (24 * 3600 * 1000) +
                " đêm(" +
                laythang(data.checkIn.getUTCMonth() + 1) +
                data.checkIn.getUTCDate() +
                " to " +
                laythang(data.checkOut.getUTCMonth() + 1) +
                data.checkOut.getUTCDate()}
            </Text>
            <Text>Into money:</Text>
            <Text>{data.priceRoom * ((data.checkOut - data.checkIn) / (24 * 3600 * 1000))}</Text>
            <TextInput
              value={nameUser}
              placeholder="Name"
              onChange={(e) => {
                setNameUSer(e.nativeEvent.text);
              }}
            />
            <TextInput
              value={phone}
              placeholder="Phone"
              onChange={(e) => {
                setPhone(e.nativeEvent.text);
              }}
            />
            <TextInput value={data.email} />
          </View>
        )}
        {state === 2 && (
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
        )}
      </View>
      <Button
        title="Next"
        onPress={() => {
          if (state == 2) {
            handleCredit();
          }
          if (state < 2 ) setState(state + 1);
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          setState(state - 1);
        }}
      />
    </View>
  );
};

export default Payment;
