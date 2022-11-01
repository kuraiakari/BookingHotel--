import React, { useState } from "react";
import { View, Button } from "react-native";
import { useNavigate } from "react-router-native";

import BillingInfor from "./BillingInfor";
import ContacInfo from "./ContactInfo";
import PaymentCard from "./PaymentCard";

const Payment = () => {
  const navigete = useNavigate();
  const handlePressBack = () => {
    navigete(-1);
  };
  const [state, setState] = useState(1);
  return (
    <View style={{ marginTop: 40 }}>
      <Button
        title="Back"
        onPress={() => {
          handlePressBack();
        }}
      />
      <View style={{height: 300}}>
        {state === 1 && (
          <View>
            <BillingInfor />
            <ContacInfo />
          </View>
        )}
        {state === 2 && <PaymentCard />}
      </View>
      <Button
        title="Next"
        onPress={() => {
          setState(state + 1);
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
