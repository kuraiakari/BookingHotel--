import React from "react";
import { View, Text } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";

import {
  Start,
  Login,
  Register,
  Search,
  ListHotel,
  HotelDetail,
  Payment,
  PersonalDetails,
  EditProfile,
  ChangePassword,
  Credit,
  Support,
  StatusBooking,
  Order,
  OrderDetail,
  LikeHotel
} from "../Page";

const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Start />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/search" element={<Search />} />
        <Route path="/listhotel" element={<ListHotel />} />
        <Route path="/hoteldetail" element={<HotelDetail />} />
        <Route path="/payment" element={<Payment />} />

        <Route exact path="/person" element={<PersonalDetails />} />
        <Route path="/person/editprofile" element={<EditProfile />} />
        <Route path="/person/changepassword" element={<ChangePassword />} />
        <Route path="/person/credit" element={<Credit />} />
        <Route path="/person/support" element={<Support />} />
        <Route path="/statusbooking" element={<StatusBooking />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderdetail" element={<OrderDetail />} />
        <Route path="/likeHotel" element={<LikeHotel />} />
      </Routes>
    </NativeRouter>
  );
};
export default Router;
