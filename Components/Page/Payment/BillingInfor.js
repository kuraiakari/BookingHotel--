import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const BillingInfor = () => {
  const data = useSelector((state) => state);
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
  console.log(data);
  return (
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
      <Text>{data.price}</Text>
    </View>
  );
};
export default BillingInfor;
